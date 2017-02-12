import * as React from 'react';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navbar from '../Navbar';
import Breadcrumbs from '../Breadcrumbs';

interface Props {
    location:any;
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
                            {this.props.children}
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            </div>
        );
    }
}

export default App;