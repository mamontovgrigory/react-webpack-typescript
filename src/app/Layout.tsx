import * as React from 'react';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './index.scss';
import NavPanel from './components/NavPanel/NavPanel';

import Authorization from './components/Authorization/Authorization';

export interface LayoutProps {
    routes: any;
    params: any;
    location: {
        pathname: string
    }
}

export class Layout extends React.Component<LayoutProps, {}>{
    render(){
        const key = this.props.location.pathname;
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
                            {system.user ? this.props.children : <Authorization />}
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
}