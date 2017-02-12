import * as React from 'react';
import { Link } from 'react-router';
import {connect} from "react-redux";

interface Props {
    modules?:NavigationItem[];
}

interface State {

}

class Navbar extends React.Component<Props,State> {
    logoutClickHandler() {

    }

    componentDidMount() {
        $(".side-nav-collapse").sideNav();
        $(".dropdown-button").dropdown();

        $('.side-nav-close').on('click', function () {
            $('.side-nav').sideNav('hide');
        });
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo right">Primatel 2.0</Link>
                    <ul id="dropdown-user" className="dropdown-content">
                        <li><a onClick={this.logoutClickHandler.bind(this)}>{i18next.t('logout')}</a></li>
                    </ul>
                    {
                        <ul className="right">
                            <li>
                                <a className="dropdown-button" data-activates="dropdown-user">
                                    <div className="chip">
                                        user
                                    </div>
                                    <i className="material-icons right">arrow_drop_down</i>
                                </a>
                            </li>
                        </ul>
                    }
                    <ul className="left">
                        <li>
                            <a data-activates="slide-out" className="side-nav-collapse">
                                <i className="material-icons">menu</i>
                            </a>
                        </li>
                    </ul>
                </div>

                <ul id="slide-out" className="side-nav">
                    <li>
                        <Link to="/" className="side-nav-close display-inline-block p-l-0">
                            <img className="background" src={require('./content/crm.png')}/>
                        </Link>
                    </li>
                    {
                        this.props.modules.map((el, index) => {
                            return (
                                <li key={index}>
                                    <Link to={el.to} className="waves-effect side-nav-close">
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
                    <li><a className="waves-effect side-nav-close">{i18next.t('close')}</a></li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state: any) {
    const { modules } = state.navigation;

    return { modules };
}

export default connect(mapStateToProps)(Navbar);