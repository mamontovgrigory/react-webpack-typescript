import * as React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {IUser} from 'models/account';
import {logoutRequest} from 'redux/actions/accountActions';

interface Props {
    dispatch?:any;

    userAuthorized?:boolean;
    user?:IUser;
    modules?:any[];
}

interface State {

}

class Navbar extends React.Component<Props,State> {
    componentDidMount() {
        $('.side-nav-collapse').sideNav();
        $('.dropdown-button').dropdown();
    }

    logoutClickHandler() {
        this.props.dispatch(logoutRequest());
    }

    closeNavClickHandler() {
        $('.side-nav').sideNav('hide');
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link to="/" className="right" style={{height: '64px'}}>
                        <img src={require('./content/logo.png')}/>
                    </Link>
                    <ul id="dropdown-user" className="dropdown-content">
                        <li><a onClick={this.logoutClickHandler.bind(this)}>{i18next.t('logout')}</a></li>
                    </ul>
                    <ul className="right" hidden={!this.props.userAuthorized}>
                        <li>
                            <a className="dropdown-button" data-activates="dropdown-user">
                                <div className="chip">
                                    {this.props.user.login}
                                </div>
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
                    <ul className="left" hidden={!this.props.userAuthorized}>
                        <li>
                            <a data-activates="slide-out" className="side-nav-collapse">
                                <i className="material-icons">menu</i>
                            </a>
                        </li>
                    </ul>
                </div>

                <ul id="slide-out" className="side-nav">
                    <li>
                        <Link to="/" className="display-inline-block p-l-0"
                              onClick={this.closeNavClickHandler.bind(this)}>
                            <img className="background" src={require('./content/crm.png')}/>
                        </Link>
                    </li>
                    {
                        this.props.userAuthorized && this.props.modules.map((el, index) => {
                            return (
                                <li key={index}>
                                    <Link to={el.to} className="waves-effect"
                                          onClick={this.closeNavClickHandler.bind(this)}>
                                        <i className="material-icons">{el.icon}</i>
                                        {el.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <li>
                        <div className="divider"></div>
                    </li>
                    <li>
                        <a className="waves-effect"
                           onClick={this.closeNavClickHandler.bind(this)}>{i18next.t('close')}</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state:any) {
    const {modules} = state.navigation;
    const {authorized, user} = state.account;

    return {
        modules,
        userAuthorized: authorized,
        user
    };
}

export default connect(mapStateToProps)(Navbar);