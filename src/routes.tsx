import * as React from 'react';
import {IndexRoute, Route}  from 'react-router';

import App from './components/App';
import MainPage from './components/MainPage';
import Users from './components/Users';
import Telephony from './components/Telephony';
import Groups from './components/Groups';

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