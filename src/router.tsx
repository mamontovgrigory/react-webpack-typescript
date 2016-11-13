import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { Layout } from './Layout';
import { Hello } from './components/Hello';
import { Test } from './components/Test';

class HelloWrapper extends React.Component<{}, {}>{
    render(){
        return (
            <Hello compiler={'Webpack'} framework={'React'} />
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={HelloWrapper} key="index" />
            <Route path="test" component={Test} key="test" />
        </Route>
    </Router>,
    document.getElementById('app')
);