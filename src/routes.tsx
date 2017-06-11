import * as React from 'react';
import {IndexRoute, Route}  from 'react-router';

import App from './containers/App';
import MainPage from './containers/MainPage';
import UsersPage from './containers/UsersPage';
import CabinetsPage from './containers/CabinetsPage';
import TelephonyPage from './containers/TelephonyPage';
import GroupsPage from './containers/GroupsPage';

let store;

function checkPermission(pathname, state){
    let moduleItem = _.find(state.navigation.modules, function(m){
        return m.to === pathname;
    });
    return moduleItem && moduleItem.enabled;
}

function requirePermission(nextState, transition, cb) {
    let state = store.getState();
    if(!checkPermission(nextState.location.pathname, state)){
        transition('/');
    }
    cb();
}

export default function routes(storeRef:Object) {
    store = storeRef;

    return (
        <Route component={App} path='/'>
            <IndexRoute component={MainPage}/>
            <Route component={UsersPage} path="/users" onEnter={requirePermission}/>
            <Route component={GroupsPage} path="/groups" onEnter={requirePermission}/>
            <Route component={TelephonyPage} path="/telephony"/>
            <Route component={CabinetsPage} path="/cabinets" onEnter={requirePermission}/>
        </Route>
    );
}