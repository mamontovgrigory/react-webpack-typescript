import * as React from 'react';
import {connect} from 'react-redux';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {generator} from 'shell/index';
import {checkSession} from 'redux/actions/accountActions';
import Navbar from '../Navbar';
import Breadcrumbs from '../Breadcrumbs';
import LoginPage from '../LoginPage';
import Loader from 'components/Loader/Loader';

interface Props {
    dispatch?:any;

    location:any;
    userAuthorized:boolean;
}

interface State {

}

class App extends React.Component<Props, State> {
    componentWillMount() {
        this.props.dispatch(checkSession());
    }

    render() {
        const key = generator.getHash(this.props.location.pathname);
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