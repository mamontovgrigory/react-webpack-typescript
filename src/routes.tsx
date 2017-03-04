import * as React from 'react';
import {IndexRoute, Route}  from 'react-router';

import App from './containers/App';
import MainPage from './containers/MainPage';
import Users from './containers/UsersPage';
import Telephony from './containers/TelephonyPage';
import Groups from './containers/GroupsPage';

let store;

export default function routes(storeRef:Object) {
    store = storeRef;
    
    return (
        <Route component={App} path='/'>
            <IndexRoute component={MainPage}/>
            <Route component={Users} path="users"/>
            <Route component={Groups} path="groups"/>
            <Route component={Telephony} path="telephony"/>
        </Route>
    );
}