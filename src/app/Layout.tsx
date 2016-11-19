import * as React from 'react';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './index.scss';
import NavPanel from './components/NavPanel/NavPanel';

import Authorization from './components/Authorization/Authorization';

export interface LayoutProps {
    location: {
        pathname: string
    }
}

import { browserHistory } from 'react-router'

export class Layout extends React.Component<LayoutProps, {}>{
    hello(){
        browserHistory.push('/');
    }
    test(){
        browserHistory.push('test');
    }
    render(){
        const key = this.props.location.pathname;
        console.log('layout', system.user);
        return (
            <div>
                <NavPanel />
                <div className="container">
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="page-transition"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={true}
                        transitionEnterTimeout={500}
                        transitionLeave={false}>
                        <div key={key}>
                            <button onClick={this.hello.bind(this)}>Hello</button>
                            <button onClick={this.test.bind(this)}>Test</button>
                            {system.user ? this.props.children : <Authorization />}
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
}