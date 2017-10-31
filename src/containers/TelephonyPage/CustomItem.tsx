import * as React from 'react';

import { dialog } from 'shell/index';
import { ICallDetails, IUniqueComments } from 'models/telephony';
import InputAutocomplete from '../../components/InputAutocomplete/InputAutocomplete';
import Input from 'components/Input/Input';
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
    uniqueComments?: IUniqueComments,

    dispatch?: any;
}

interface IState {
    commentId?: number;
    numfrom?: string;
    time?: string;
    mark?: string;
    model?: string;
    comment?: string;
    objective?: string;
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
            comment: props.callDetails && props.callDetails.comment ? props.callDetails.comment : '',
            objective: props.callDetails && props.callDetails.objective ? props.callDetails.objective : ''
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
            numfrom: e.target.value.substr(0, 11)
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

    save(callback) {
        const {clientId, dispatch, updateCallsDetailsGrid} = this.props;
        const {commentId, numfrom, time, mark, model, comment, objective} = this.state;
        const data: any = {
            loginId: clientId,
            numfrom,
            time,
            mark,
            model,
            comment,
            objective
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
        const {uniqueComments, objectiveOptions} = this.props;
        const {numfrom, time, mark, model, comment, objective} = this.state;
        let marksSource = this.getAutocompleteSource(uniqueComments.marks);
        let modelsSource = this.getAutocompleteSource(uniqueComments.models);
        return (
            <div>
                <div className="row">
                    <Input label={i18next.t('dateAndTime')}
                           s={6}
                           value={time}
                           onChange={this.timeChangeHandler.bind(this)}/>
                    <Input label={i18next.t('outgoing')}
                           s={6}
                           value={numfrom}
                           onChange={this.numfromChangeHandler.bind(this)}/>
                </div>
                <div className="row">
                    <Select label={i18next.t('objective')}
                            value={objective}
                            options={objectiveOptions}
                            onChange={this.objectiveChangeHandler.bind(this)}/>
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
                    <Textarea label={i18next.t('comment')}
                              value={comment}
                              onChange={this.commentChangeHandler.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default CustomItem;