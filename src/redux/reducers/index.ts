import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import breadcrumbsReducer from './breadcrumbsReducer';
import cabinetsReducer from './cabinetsReducer';
import groupsReducer from './groupsReducer';
import loaderReducer from './loaderReducer';
import navigationReducer from './navigationReducer';
import permissionsReducer from './permissionsReducer';
import telephonyReducer from './telephonyReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    account: accountReducer,
    breadcrumbs: breadcrumbsReducer,
    cabinets: cabinetsReducer,
    groups: groupsReducer,
    loader: loaderReducer,
    navigation: navigationReducer,
    permissions: permissionsReducer,
    telephony: telephonyReducer,
    users: usersReducer
});
