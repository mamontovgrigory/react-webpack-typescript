import * as React from 'react';
import {connect} from 'react-redux';

import {logIn} from '../../redux/actions/accountActions.ts';

interface Props {
    dispatch?: any
}

interface State {
    notification:string;
    login?:string;
    password?:string;
}

let loginInput:HTMLInputElement = null;
let passportInput:HTMLInputElement = null;

class LoginPage extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            notification: ''
        };
    }

    handleLoginChange(e) {
        this.setState({login: e.target.value, notification: ''});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value, notification: ''});
    }

    login() {
        if (this.state && this.state.login && this.state.password) {
            this.props.dispatch(logIn({
                login: this.state.login,
                password: this.state.password
            }));
        } else {
            if (this.state.login) {
                passportInput.focus();
            } else {
                loginInput.focus();
            }
            this.setState({notification: i18next.t('inputLoginAndPassword')});
        }
    }

    render() {
        return (
            <div className="row m-t-10">
                <div className="col s6 offset-s3">
                    <h4 className="center-align">{i18next.t('authorization')}</h4>
                    <div className="row">
                        <form className="col s12" onSubmit={this.login.bind(this)}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="login" name="login" type="text" className="validate"
                                           ref={(input) => { loginInput = input; }}
                                           onChange={this.handleLoginChange.bind(this)}/>
                                    <label htmlFor="login" className="">{i18next.t('login')}</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">vpn_key</i>
                                    <input id="password" type="password" name="password" className="validate"
                                           ref={(input) => { passportInput = input; }}
                                           onChange={this.handlePasswordChange.bind(this)}/>
                                    <label htmlFor="password" className="">{i18next.t('password')}</label>
                                </div>
                            </div>
                            <div className="error">
                                {this.state.notification}
                            </div>
                            <div className="input-field col s12">
                                <a className="waves-effect waves-light btn right"
                                   onClick={this.login.bind(this)}>{i18next.t('logIn')}</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state:any) {
    const {authorized} = state.account;

    return {authorized};
}

export default connect(mapStateToProps)(LoginPage);