import * as React from 'react';
import {IndexRoute, Route}  from 'react-router';

import App from './containers/App';
import MainPage from './containers/MainPage';
import Users from './containers/UsersPage';
import Telephony from './containers/TelephonyPage';
import Groups from './containers/GroupsPage';

let store;

function checkPermission(pathname, state){ //TODO: Make universal role model
    let modulesMapping = {
        users: 'users_manage',
        groups: 'groups_manage'
    };
    let moduleName = modulesMapping[pathname.replace(/\//, '')];
    let permissions = state.account.user.permissions;
    return moduleName && permissions && permissions[moduleName];
}

function requirePermissions(nextState, transition, cb) {
    setTimeout(() => {
        let state = store.getState();
        if(!checkPermission(nextState.location.pathname, state)){
            transition('/');
        }
        cb();
    }, 0);
}

export default function routes(storeRef:Object) {
    store = storeRef;

    return (
        <Route component={App} path='/'>
            <IndexRoute component={MainPage}/>
            <Route component={Users} path="/users" onEnter={requirePermissions}/>
            <Route component={Groups} path="/groups" onEnter={requirePermissions}/>
            <Route component={Telephony} path="/telephony"/>
        </Route>
    );
}