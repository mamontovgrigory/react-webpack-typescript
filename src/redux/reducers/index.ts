import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import breadcrumbsReducer from './breadcrumbsReducer';
import loaderReducer from './loaderReducer';
import navigationReducer from './navigationReducer';
import usersReducer from './usersReducer';
import groupsReducer from './groupsReducer';

export default combineReducers({
    account: accountReducer,
    breadcrumbs: breadcrumbsReducer,
    loader: loaderReducer,
    navigation: navigationReducer,
    users: usersReducer,
    groups: groupsReducer
});
