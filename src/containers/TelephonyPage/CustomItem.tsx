import * as React from 'react';
import * as moment from 'moment';

import { dialog } from 'shell/index';
import { ICallDetails, IUniqueComments } from 'models/telephony';
import InputAutocomplete from '../../components/InputAutocomplete/InputAutocomplete';
import Input from 'components/Input/Input';
import InputMask from 'components/InputMask/InputMask';
import Select from 'components/Select/Select';
import Textarea from 'components/Textarea/Textarea';
import { saveComments } from 'redux/actions/telephonyActions';

interface IProps {
    clientId: number;
    login?: string;
    callDetails?: ICallDetails;
    saveButtonId: string;//TODO: Handle click using jquery
    updateCallsDetailsGrid: Function;
    objectiveOptions: any;
    moderationOptions: any;
    uniqueComments?: IUniqueComments,

    dispatch?: any;
}

interface IState {
    commentId?: number;
    numfrom?: string;
    time?: string;
    mark?: string;
    model?: string;
    client?: string;
    manager?: string;
    comment?: string;
    objective?: string;
    moderation?: string;
}

class CustomItem extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            commentId: props.callDetails && props.callDetails.commentId ? props.callDetails.commentId : '',
            numfrom: props.callDetails && props.callDetails.numfrom ? props.callDetails.numfrom.replace(/\D/g, '') : '',
            time: props.callDetails && props.callDetails.time ? props.callDetails.time : '',
            mark: props.callDetails && props.callDetails.mark ? props.callDetails.mark : '',
            model: props.callDetails && props.callDetails.model ? props.callDetails.model : '',
            client: props.callDetails && props.callDetails.client ? props.callDetails.client : '',
            manager: props.callDetails && props.callDetails.manager ? props.callDetails.manager : '',
            comment: props.callDetails && props.callDetails.comment ? props.callDetails.comment : '',
            objective: props.callDetails && props.callDetails.objective ? props.callDetails.objective : '',
            moderation: props.callDetails && props.callDetails.moderation ? props.callDetails.moderation : ''
        }
    }

    getAutocompleteSource(array) {
        let source = {};
        array.map((comment: string) => {
            for (let i = 1; i <= comment.length; i++) {
                let key = comment.substr(0, i).toUpperCase();
                if (!source[key]) source[key] = [];
                source[key].push({
                    id: comment,
                    text: comment
                });
            }
        });
        return source;
    }

    componentDidMount() {
        Materialize.updateTextFields();
        let self = this;

        $('#' + this.props.saveButtonId).on('click', function () { //TODO: Needs react realization
            let dialogId = $(this).closest('.modal').attr('id');
            self.save(function () {
                dialog.close(dialogId);
            });
        });
    }

    numfromChangeHandler(e) {
        this.setState({
            numfrom: e.target.value
        });
    }

    timeChangeHandler(e) {
        this.setState({
            time: e.target.value
        });
    }

    markChangeHandler(e) {
        this.setState({
            mark: e.target.value
        });
    }

    modelChangeHandler(e) {
        this.setState({
            model: e.target.value
        });
    }

    clientChangeHandler(e) {
        this.setState({
            client: e.target.value
        });
    }

    managerChangeHandler(e) {
        this.setState({
            manager: e.target.value
        });
    }

    commentChangeHandler(e) {
        this.setState({
            comment: e.target.value
        });
    }

    objectiveChangeHandler(e) {
        this.setState({
            objective: e.target.value
        });
    }

    moderationChangeHandler(e) {
        this.setState({
            moderation: e.target.value
        });
    }

    save(callback) {
        const {clientId, dispatch, updateCallsDetailsGrid} = this.props;
        const {commentId, numfrom, time, mark, model, client, manager, comment, objective, moderation} = this.state;
        const data: any = {
            loginId: clientId,
            numfrom: numfrom.replace(/\D/g, ''),
            time: moment(time, 'DD.MM.YY HH:mm').format('YYYY-MM-DD HH:mm:ss'),
            mark,
            model,
            client,
            manager,
            comment,
            objective,
            moderation
        };
        if (typeof (commentId) === 'number') {
            data.id = commentId;
        }
        dispatch(saveComments(data, function () {
            updateCallsDetailsGrid();
        }));
        callback();
    }

    render() {
        const {uniqueComments, objectiveOptions, moderationOptions} = this.props;
        const {numfrom, time, mark, model, client, manager, comment, objective, moderation} = this.state;
        let marksSource = this.getAutocompleteSource(uniqueComments.marks);
        let modelsSource = this.getAutocompleteSource(uniqueComments.models);
        return (
            <div>
                <div className="row">
                    <InputMask label={i18next.t('dateAndTime')}
                               mask="99.99.99 99:99"
                               s={6}
                               value={time}
                               onChange={this.timeChangeHandler.bind(this)}/>
                    <InputMask label={i18next.t('outgoing')}
                               mask="+7(999)999-99-99"
                               s={6}
                               value={numfrom}
                               onChange={this.numfromChangeHandler.bind(this)}/>
                </div>
                <div className="row">
                    <Select label={i18next.t('objective')}
                            s={6}
                            value={objective}
                            options={objectiveOptions}
                            onChange={this.objectiveChangeHandler.bind(this)}/>
                    <Select label={i18next.t('moderation')}
                            s={6}
                            value={moderation}
                            options={moderationOptions}
                            onChange={this.moderationChangeHandler.bind(this)}/>
                </div>
                <div className="row">
                    <InputAutocomplete label={i18next.t('mark')}
                                       source={marksSource}
                                       s={6}
                                       value={mark}
                                       onChange={this.markChangeHandler.bind(this)}/>
                    <InputAutocomplete label={i18next.t('model')}
                                       source={modelsSource}
                                       s={6}
                                       value={model}
                                       onChange={this.modelChangeHandler.bind(this)}/>
                </div>
                <div className="row">
                    <Input label={i18next.t('clientName')}
                           s={6}
                           value={client}
                           onChange={this.clientChangeHandler.bind(this)}/>
                    <Input label={i18next.t('managerName')}
                           s={6}
                           value={manager}
                           onChange={this.managerChangeHandler.bind(this)}/>
                </div>
                <div className="row">
                    <Textarea label={i18next.t('comment')}
                              value={comment}
                              onChange={this.commentChangeHandler.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default CustomItem;