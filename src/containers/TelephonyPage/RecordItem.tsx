import * as React from 'react';

import {dialog} from 'shell/index';
import {ICallDetails} from 'models/telephony';
import Input from 'components/Input/Input'
import Textarea from 'components/Textarea/Textarea';
import Checkbox from 'components/Checkbox/Checkbox';
import {saveComments} from 'redux/actions/telephonyActions';

interface Props {
    callDetails:ICallDetails;
    saveButtonId:string;//TODO: Handle click using jquery
    updateCallsDetailsGrid:Function;

    dispatch?:any;
}

interface State {
    id?:string;
    mark?:string;
    model?:string;
    comment?:string;
    useful?:boolean;
}

class RecordItem extends React.Component<Props, State> {
    constructor(props) {
        super();

        this.state = {
            id: props.callDetails.id,
            mark: props.callDetails.mark,
            model: props.callDetails.model,
            comment: props.callDetails.comment,
            useful: props.callDetails.useful === 'true',
        }
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

    usefulChangeHandler(e) {
        this.setState({
            useful: e.target.checked
        });
    }

    save(callback) {
        let updateCallsDetailsGrid = this.props.updateCallsDetailsGrid;
        this.props.dispatch(saveComments(this.state, function(){
            updateCallsDetailsGrid();
        }));
        callback();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <Checkbox label={i18next.t('useful')}
                              checked={this.state.useful}
                              onChange={this.usefulChangeHandler.bind(this)}/>
                </div>
                <div className="row">
                    <Input label={i18next.t('mark')}
                           value={this.state.mark}
                           onChange={this.markChangeHandler.bind(this)}/>
                </div>
                <div className="row">
                    <Input label={i18next.t('model')}
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