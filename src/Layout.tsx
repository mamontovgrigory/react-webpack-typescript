import * as React from "react";
import { Link } from 'react-router';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export interface LayoutProps {
    location: {
        pathname: string
    }
}

export class Layout extends React.Component<LayoutProps, {}>{
    render(){
        const key = this.props.location.pathname;
        return (
            <div>
                <h1>Lalala</h1>
                <div>
                    <Link to="/">Hello</Link>
                    <Link to="/test">Test</Link>
                </div>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="page-transition"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={true}
                    transitionEnterTimeout={500}
                    transitionLeave={false}>
                    <div key={key}>
                        {this.props.children}
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}