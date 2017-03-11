import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import breadcrumbsReducer from './breadcrumbsReducer';
import groupsReducer from './groupsReducer';
import loaderReducer from './loaderReducer';
import navigationReducer from './navigationReducer';
import usersReducer from './usersReducer';
import permissionsReducer from './permissionsReducer';

export default combineReducers({
    account: accountReducer,
    breadcrumbs: breadcrumbsReducer,
    groups: groupsReducer,
    loader: loaderReducer,
    navigation: navigationReducer,
    permissions: permissionsReducer,
    users: usersReducer
});
