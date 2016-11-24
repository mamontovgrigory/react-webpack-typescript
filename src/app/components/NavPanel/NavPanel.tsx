import * as React from 'react';
import { Link } from 'react-router';

interface Module{
    name: string;
    icon: string;
    to: string;
    src: string;
    description: string;
    roles: string[];
}

interface NavPanelState{
    modules: Module[]
}

export default class NavPanel extends React.Component<{}, NavPanelState>{
    constructor(){
        super();

        this.state = {
            modules:[]
        }
    }
    componentWillMount() {
        var self = this;
        /*Navigation.getList(function(modules: Module[]){
            self.setState({
                modules: modules
            });
        });*/
        /*mediator.publish(channels.NAVIGATION_GET_ITEMS, null, function (response) {
            self.setState({
                modules: response
            });
        });*/
    }
    componentDidMount() {
        $(".side-nav-collapse").sideNav();

        $('.side-nav-close').on('click', function(){
            $('.side-nav').sideNav('hide');
        });
    }
    logoutClickHandler(){
        /*system.user = null;
        $.removeCookie('login');
        $.removeCookie('isAdmin');
        window.location = '#/';*/
    }
    render(){
        var user = system.user;
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo right">Primatel 2.0</Link>
                    <ul id="dropdown-user" className="dropdown-content">
                        <li><a onClick={this.logoutClickHandler.bind(this)}>Выйти</a></li>
                    </ul>
                    {
                        user ?
                            <ul className="right">
                                <li>
                                    <a className="dropdown-button" data-activates="dropdown-user">
                                        <div className="chip">
                                            {user.login}
                                        </div>
                                        <i className="material-icons right">arrow_drop_down</i>
                                    </a>
                                </li>
                            </ul>
                            :
                            null
                    }
                    <ul className="left">
                        <li>
                            <a data-activates="slide-out" className="side-nav-collapse" hidden={!system.user}>
                                <i className="material-icons">menu</i>
                            </a>
                        </li>
                    </ul>
                </div>

                <ul id="slide-out" className="side-nav">
                    <li>
                        <Link to="/" className="side-nav-close display-inline-block p-l-0">
                            <img className="background" src={require('./content/crm.png')} />
                        </Link>
                    </li>
                    {
                        this.state.modules.map((el, index) => {
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
                    <li><div className="divider"></div></li>
                    <li><a className="waves-effect side-nav-close">Закрыть</a></li>
                </ul>
            </nav>
        );
    }
}