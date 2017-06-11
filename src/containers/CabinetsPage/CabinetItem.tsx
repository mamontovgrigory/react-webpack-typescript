import * as React from 'react';

import {dialog} from 'shell/index';
import Input from 'components/Input/Input';
import Checkbox from 'components/Checkbox/Checkbox';
import {saveCabinet} from 'redux/actions/cabinetsActions';

interface IProps {
    dispatch: any;

    id?: string;
    login?: string;
    password?: string;
    name?: string;
    saveButtonId: string;
    clients?: any[];
}

interface IState {
    id?: string;
    login?: string;
    password?: string;
    name?: string;
}

export default class CabinetItem extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            login: props.login,
            password: props.password,
            name: props.name
        }
    }

    loginInput: HTMLInputElement;
    passwordInput: HTMLInputElement;

    loginChangeHandler(e) {
        this.setState({
            login: e.target.value
        })
    }

    passwordChangeHandler(e) {
        this.setState({
            password: e.target.value
        })
    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        })
    }

    save(callback) {
        const {dispatch} = this.props;
        const {id, login, password, name} = this.state;

        if (!login) {
            this.loginInput.focus();
            return;
        }
        if (!password) {
            this.passwordInput.focus();
            return;
        }
        dispatch(saveCabinet({
            id: id,
            login: login,
            password: password,
            name: name
        }));
        callback();
    }

    componentDidMount() {
        const {saveButtonId} = this.props;

        const save = this.save.bind(this);
        $('#' + saveButtonId).on('click', function () { //TODO: Needs react realization
            const dialogId = $(this).closest('.modal').attr('id');
            save(function () {
                dialog.close(dialogId);
            });
        });
    }

    render() {
        const {clients} = this.props;
        const {login, password, name} = this.state;
        return (
            <div>
                <div className="row">
                    <Input s={6}
                           value={login}
                           getRef={(input) => {
                               this.loginInput = input;
                           }}
                           onChange={this.loginChangeHandler.bind(this)}
                           label={i18next.t('login')}/>
                    <Input s={6}
                           value={password}
                           getRef={(input) => {
                               this.passwordInput = input;
                           }}
                           onChange={this.passwordChangeHandler.bind(this)}
                           label={i18next.t('password')}/>
                </div>
                <div className="row">
                    <Input value={name}
                           onChange={this.nameChangeHandler.bind(this)}
                           label={i18next.t('cabinetName')}/>
                </div>
                <div className="row">
                    {clients && clients.map((client) => {
                        return (
                            <Checkbox s={4} label={client.login} checked={client.active === '1'}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}