import * as React from 'react';

interface Props {

}

interface State {
    notification:string;
    login?:string;
    password?:string;
}

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
                                           onChange={this.handleLoginChange.bind(this)}/>
                                    <label htmlFor="login" className="">{i18next.t('login')}</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">vpn_key</i>
                                    <input id="password" type="password" name="password" className="validate"
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

export default LoginPage;