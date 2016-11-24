import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Layout} from '../app/Layout';
import Authorization from '../app/components/Authorization/Authorization'; //TODO: Move components to config
import Main from '../app/components/Main/Main';
import Telephony from '../app/components/Telephony/Telephony';
import Users from '../app/components/Users/Users';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={Main}/>
            <Route path="authorization" component={Authorization}/>
            <Route path="users" component={Users}/>
            <Route path="telephony" component={Telephony}/>
        </Route>
    </Router>,
    document.getElementById('app')
);