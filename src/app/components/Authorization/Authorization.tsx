import * as React from 'react';
import {browserHistory} from 'react-router';

interface AuthorizationState {
    login?: string,
    password?: string,
    notification?: string
}

export default class Authorization extends React.Component<{}, AuthorizationState> {
    constructor() {
        super();

        this.state = {
            notification: ""
        };
    }

    handleLoginChange(e: any): void {
        this.setState({login: e.target.value, notification: ""});
    }

    handlePasswordChange(e: any): void {
        this.setState({password: e.target.value, notification: ""});
    }

    authorization(): void {
        if (this.state && this.state.login && this.state.password) {
            var self = this;
            /*mediator.publish(channels.AUTHORIZATION_LOGIN, {
             login: self.state.login,
             password: self.state.password
             }, function(response){
             if(response){
             system.user = response;
             $.cookie('login', response.login);
             $.cookie('isAdmin', response.isAdmin);
             window.location = '#/';
             }else{
             self.setState({ notification: 'Неправильный логин или пароль' });
             }
             });*/
            system.user = {
                login: 'test',
                isAdmin: true
            };
            browserHistory.push('/');
        } else {
            if (this.state.login) {
                $("[name='password']").focus();
            } else {
                $("[name='login']").focus();
            }
            this.setState({notification: 'Введите логин и пароль'});
        }
    }

    render() {
        return (
            <div className="row m-t-10">
                <div className="col s6 offset-s3">
                    <h4 className="center-align">Авторизация</h4>
                    <div className="row">
                        <form className="col s12" onSubmit={this.authorization.bind(this)}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="login" name="login" type="text" className="validate"
                                           onChange={this.handleLoginChange.bind(this)}/>
                                    <label htmlFor="login" className="">Логин</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">vpn_key</i>
                                    <input id="password" type="password" name="password" className="validate"
                                           onChange={this.handlePasswordChange.bind(this)}/>
                                    <label htmlFor="password" className="">Пароль</label>
                                </div>
                            </div>
                            <div className="error">
                                {this.state.notification}
                            </div>
                            <div className="input-field col s12">
                                <a className="waves-effect waves-light btn right"
                                   onClick={this.authorization.bind(this)}>Войти</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}