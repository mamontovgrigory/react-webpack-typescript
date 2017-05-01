import * as React from 'react';

import {dialog} from 'shell/index';
import {ICallDetails, IUniqueComments} from 'models/telephony';
import Audio from 'components/Audio/Audio';
import InputAutocomplete from '../../components/InputAutocomplete/InputAutocomplete';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import Textarea from 'components/Textarea/Textarea';
import {saveComments, getRecord} from 'redux/actions/telephonyActions';

interface IProps {
    login: string,
    clientId: string;
    callDetails: ICallDetails;
    saveButtonId: string;//TODO: Handle click using jquery
    updateCallsDetailsGrid: Function;
    objectiveOptions: any;
    uniqueComments?: IUniqueComments,

    dispatch?: any;
}

interface IState {
    callid?: string;
    duration?: string;
    mark?: string;
    model?: string;
    comment?: string;
    objective?: string;
    src?: string;
}

class RecordItem extends React.Component<IProps, IState> {
    constructor(props) {
        super();

        const {callid, duration, mark, model, comment, objective} = props.callDetails;

        this.state = {
            callid: callid ? callid : '',
            duration: duration ? duration : '',
            mark: mark ? mark : '',
            model: model ? model : '',
            comment: comment ? comment : '',
            objective: objective ? objective : ''
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

        const callid = this.state.callid;
        let self = this;
        if (callid) {
            this.props.dispatch(getRecord({
                login: this.props.login,
                callid: callid
            }, function (record) {
                self.setState({
                    src: record.src
                });
            }));
        }

        $('#' + this.props.saveButtonId).on('click', function () { //TODO: Needs react realization
            let dialogId = $(this).closest('.modal').attr('id');
            self.save(function () {
                dialog.close(dialogId);
            });
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
        let updateCallsDetailsGrid = this.props.updateCallsDetailsGrid;
        this.props.dispatch(saveComments({
            id: this.state.callid,
            loginId: this.props.clientId,
            mark: this.state.mark,
            model: this.state.model,
            comment: this.state.comment,
            objective: this.state.objective
        }, function () {
            updateCallsDetailsGrid();
        }));
        callback();
    }

    render() {
        const {duration, src, mark, model, comment, objective} = this.state;
        let marksSource = this.getAutocompleteSource(this.props.uniqueComments.marks);
        let modelsSource = this.getAutocompleteSource(this.props.uniqueComments.models);
        return (
            <div>
                {parseInt(duration) > 0 &&
                <div className="row">
                    <Audio src={src}/>
                </div>}
                <div className="row">
                    <Select label={i18next.t('objective')}
                            value={objective}
                            options={this.props.objectiveOptions}
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

export default RecordItem;