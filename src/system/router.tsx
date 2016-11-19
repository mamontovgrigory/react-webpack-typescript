import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Layout } from '../app/Layout';
import Authorization from '../app/components/Authorization/Authorization';
import { Hello } from '../app/components/Hello';
import { Test } from '../app/components/Test';

class HelloWrapper extends React.Component<{}, {}>{
    render(){
        return (
            <Hello compiler={'Webpack'} framework={'React'} />
        )
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={HelloWrapper} />
            <Route path="authorization" component={Authorization} />
            <Route path="test" component={Test} />
        </Route>
    </Router>,
    document.getElementById('app')
);