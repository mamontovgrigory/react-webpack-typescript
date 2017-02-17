import * as React from 'react';
import {connect} from 'react-redux';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navbar from '../Navbar';
import Breadcrumbs from '../Breadcrumbs';
import LoginPage from '../LoginPage';

interface Props {
    location:any;
    userAuthorized:boolean;
    loaderActive:boolean;
}

interface State {

}

class App extends React.Component<Props, State> {
    render() {
        const key = this.props.location.pathname;
        return (
            <div>
                <Navbar/>
                <Breadcrumbs/>
                <div className="container">
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="page-transition"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={true}
                        transitionEnterTimeout={500}
                        transitionLeave={false}>
                        <div key={key} className="section">
                            {this.props.userAuthorized ? this.props.children : <LoginPage/>}
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
                <div className={'loader-wrapper ' + (this.props.loaderActive ? 'active' : '')}>
                    <div className="loader"></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state:any) {
    const {active} = state.loader;
    const {authorized} = state.account;

    return {
        loaderActive: active,
        userAuthorized: authorized
    };
}

export default connect(mapStateToProps)(App);