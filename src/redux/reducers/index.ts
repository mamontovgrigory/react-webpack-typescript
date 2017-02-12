import { combineReducers } from 'redux';

import breadcrumbsReducer from './breadcrumbsReducer';
import navigationReducer from './navigationReducer';
import userReducer from './userReducer';

export default combineReducers({
    breadcrumbs: breadcrumbsReducer,
    navigation: navigationReducer,
    user: userReducer
});
