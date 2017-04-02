import * as React from 'react';

import {dialog} from 'shell/index';
import {ICallDetails} from 'models/telephony';
import Audio from 'components/Audio/Audio';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import Textarea from 'components/Textarea/Textarea';
import {saveComments, getRecord} from 'redux/actions/telephonyActions';

interface IProps {
    login:string,
    callDetails:ICallDetails;
    saveButtonId:string;//TODO: Handle click using jquery
    updateCallsDetailsGrid:Function;
    objectiveOptions:any;

    dispatch?:any;
}

interface IState {
    callid?:string;
    duration?:string;
    mark?:string;
    model?:string;
    comment?:string;
    objective?:string;
    src?:string;
}

class RecordItem extends React.Component<IProps, IState> {
    constructor(props) {
        super();

        this.state = {
            callid: props.callDetails.callid,
            duration: props.callDetails.duration,
            mark: props.callDetails.mark,
            model: props.callDetails.model,
            comment: props.callDetails.comment,
            objective: props.callDetails.objective
        }
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
        return (
            <div>
                {parseInt(this.state.duration) > 0 &&
                <div className="row">
                    <Audio src={this.state.src}/>
                </div>}
                <div className="row">
                    <Select label={i18next.t('objective')}
                            value={this.state.objective}
                            options={this.props.objectiveOptions}
                            onChange={this.objectiveChangeHandler.bind(this)}/>
                </div>
                <div className="row">
                    <Input label={i18next.t('mark')}
                           s={6}
                           value={this.state.mark}
                           onChange={this.markChangeHandler.bind(this)}/>
                    <Input label={i18next.t('model')}
                           s={6}
                           value={this.state.model}
                           onChange={this.modelChangeHandler.bind(this)}/>
                </div>
                <div className="row">
                    <Textarea label={i18next.t('comment')}
                              value={this.state.comment}
                              onChange={this.commentChangeHandler.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default RecordItem;