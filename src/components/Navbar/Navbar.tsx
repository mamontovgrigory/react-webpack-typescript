import * as React from 'react';
import { Link } from 'react-router';

interface Props {

}

interface State {

}

class Navbar extends React.Component<Props,State> {
    logoutClickHandler() {

    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo right">Primatel 2.0</Link>
                    <ul id="dropdown-user" className="dropdown-content">
                        <li><a onClick={this.logoutClickHandler.bind(this)}>Выйти</a></li>
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
                            <a data-activates="slide-out" className="side-nav-collapse" hidden={true}>
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
                        [].map((el, index) => {
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
                    <li><a className="waves-effect side-nav-close">Закрыть</a></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;