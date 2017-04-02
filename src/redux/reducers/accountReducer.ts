import {LOG_IN, LOG_OUT, PERMISSIONS} from 'redux/actions/accountActions';
import {IUser, IUserPermissions} from "models/account";

interface State {
    authorized:boolean;
    message?:string;
    user:IUser;
    permissions:IUserPermissions;
}

interface Action {
    type:string;
    message?:string;
    user?:IUser;
    permissions?:IUserPermissions;
}

const initialState:State = {
    authorized: false,
    user: {},
    permissions: {
        usersManage: false,
        groupsManage: false,
        telephonyCommentsManage: false,
        telephonyCommentsView: false,
        telephonyClients: []
    }
};

export default function (state:State = initialState, action:Action) {
    switch (action.type) {
        case LOG_IN:
            return _.assign({}, state, {
                authorized: true,
                user: action.user
            });
        case LOG_OUT:
            return _.assign({}, state, {authorized: false, user: {}, message: action.message});
        case PERMISSIONS:
            let user = state.user;
            user.permissions = action.permissions;
            return _.assign({}, state, {
                user: user
            });
        default:
            return state;
    }
}