import * as React from 'react';

import {saveUser} from 'redux/actions/usersActions';

import {generator, dialog} from 'shell/index';

interface Props {
    dispatch?:any;

    id?:any;
    login?:any;
    groupId?:any;
    groups?:any[];
    saveButtonId?:string;
}

interface State {
    loginFieldId?:string;
    passwordFieldId?:string;
    groupIdFieldId?:string;

    id?:string;
    login?:string;
    groupId?:string;
    password?:string;
}

class UserItem extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            login: props.login,
            groupId: props.groupId,

            loginFieldId: generator.genId(),
            passwordFieldId: generator.genId(),
            groupIdFieldId: generator.genId()
        }
    }

    loginInput:HTMLInputElement;
    passwordInput:HTMLInputElement;

    componentDidMount() {
        Materialize.updateTextFields();
        let $groupId = $('#' + this.state.groupIdFieldId);
        $groupId.material_select();

        $groupId.on('change', this.groupChangeHandler.bind(this)); //TODO: Needs react realization

        let self = this;

        $('#' + this.props.saveButtonId).on('click', function () { //TODO: Needs react realization
            let dialogId = $(this).closest('.modal').attr('id');
            self.save(function(){
                dialog.close(dialogId);
            });
        });
    }

    componentDidUpdate() {
        let $groupId = $('#' + this.state.groupIdFieldId);

        $groupId.material_select('destroy');
        $groupId.material_select();
    }

    loginChangeHandler(e) {
        this.setState({
            login: e.target.value
        });
    }

    groupChangeHandler(e) {
        this.setState({
            groupId: e.target.value
        });
    }

    passwordChangeHandler(e) {
        this.setState({
            password: e.target.value
        });
    }

    save(callback) {
        if (!this.state.login) {
            this.loginInput.focus();
            return;
        }
        if (!this.state.id && !this.state.password) {
            this.passwordInput.focus();
            return;
        }
        this.props.dispatch(saveUser({
            id: this.state.id,
            login: this.state.login,
            groupId: this.state.groupId,
            password: this.state.password
        }));
        callback();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id={this.state.loginFieldId} type="text"
                               defaultValue={this.props.login}
                               ref={(input) => { this.loginInput = input; }}
                               onChange={this.loginChangeHandler.bind(this)}/>
                        <label htmlFor={this.state.loginFieldId}>{i18next.t('login')}</label>
                    </div>
                    <div className="input-field col s6">
                        <select id={this.state.groupIdFieldId}
                                value={this.props.groupId}
                                onChange={this.groupChangeHandler.bind(this)}>
                            <option value="">{i18next.t('withoutGroup')}</option>
                            {
                                this.props.groups && this.props.groups.map((el) => {
                                    return (
                                        <option value={el.id} key={el.id}>{el.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label>{i18next.t('group')}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id={this.state.passwordFieldId}
                               type="password"
                               ref={(input) => { this.passwordInput = input; }}
                               onChange={this.passwordChangeHandler.bind(this)}/>
                        <label
                            htmlFor={this.state.passwordFieldId}>{this.props.id ?
                            i18next.t('newPassword') :
                            i18next.t('password')}</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserItem;