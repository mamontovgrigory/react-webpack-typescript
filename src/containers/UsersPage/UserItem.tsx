import * as React from 'react';

import {saveUser} from 'redux/actions/usersActions';
import {generator, dialog} from 'shell/index';
import Select from 'components/Select/Select';

interface Props {
    dispatch?: any;

    id?: any;
    login?: any;
    groupId?: any;
    groups: any[];
    saveButtonId?: string;
}

interface State {
    loginFieldId?: string;
    passwordFieldId?: string;
    groupIdFieldId?: string;

    id?: string;
    login?: string;
    groupId?: string;
    password?: string;
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

    loginInput: HTMLInputElement;
    passwordInput: HTMLInputElement;

    componentDidMount() {
        Materialize.updateTextFields();
        let $groupId = $('#' + this.state.groupIdFieldId);
        $groupId.material_select();

        $groupId.on('change', this.groupChangeHandler.bind(this)); //TODO: Needs react realization

        let self = this;

        $('#' + this.props.saveButtonId).on('click', function () { //TODO: Needs react realization
            let dialogId = $(this).closest('.modal').attr('id');
            self.save(function () {
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
        function loginFormat(login) {
            function upperToHyphenLower(match) {
                return match.toLowerCase();
            }

            return login.replace(/[A-Z]/g, upperToHyphenLower).replace(/[^a-z0-9@._]/g, '');
        }

        this.setState({
            login: loginFormat(e.target.value)
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
        let groupOptions = this.props.groups.map((group) => {
            return {
                value: group.id,
                name: group.name,
            };
        }).concat([{
            value: '',
            name: i18next.t('withoutGroup')
        }]);
        return (
            <div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id={this.state.loginFieldId} type="text"
                               value={this.state.login}
                               ref={(input) => {
                                   this.loginInput = input;
                               }}
                               onChange={this.loginChangeHandler.bind(this)}/>
                        <label htmlFor={this.state.loginFieldId}>{i18next.t('login')}</label>
                    </div>
                    <Select label={i18next.t('group')}
                            s={6}
                            value={this.state.groupId}
                            onChange={this.groupChangeHandler.bind(this)}
                            options={groupOptions}/>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id={this.state.passwordFieldId}
                               type="password"
                               ref={(input) => {
                                   this.passwordInput = input;
                               }}
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