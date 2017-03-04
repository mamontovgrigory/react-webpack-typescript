import * as React from 'react';
import {connect} from 'react-redux';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navbar from '../../components/Navbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import LoginPage from '../LoginPage';
import Loader from '../../components/Loader';

interface Props {
    location:any;
    userAuthorized:boolean;
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
                <Loader/>
            </div>
        );
    }
}

function mapStateToProps(state:any) {
    const {authorized} = state.account;

    return {
        userAuthorized: authorized
    };
}

export default connect(mapStateToProps)(App);