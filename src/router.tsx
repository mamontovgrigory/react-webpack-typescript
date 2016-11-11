import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { Layout } from './Layout';
import { Hello } from './components/Hello';
import { Test } from './components/Test';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={Hello} />
            <Route path="test" component={Test} />
            {
                /*system.routes.map((route, index) => {
                    return (
                        route.path === 'index' ?
                            <IndexRoute
                                key={index}
                                component={route.component}
                                breadcrumb={route.path}/>
                            :
                            <Route key={index}
                                   path={route.path}
                                   component={route.component}
                                   breadcrumb={route.path} />
                    )
                })*/
            }
        </Route>
    </Router>,
    document.getElementById('app')
);