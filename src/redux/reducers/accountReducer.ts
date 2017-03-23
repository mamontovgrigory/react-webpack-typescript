import {LOG_IN, LOG_OUT, PERMISSIONS} from '../actions/accountActions';

interface IUser {
    id?:number;
    login?:string;
    permissions?:any;
}

interface State {
    authorized:boolean;
    message?:string;
    user:IUser
}

interface Action {
    type:string;
    message?:string;
    user?:IUser;
    permissions?:{
        alias:string;
        name:string;
        type:string;
        value:any;
    }[];
}

const initialState:State = {
    authorized: false,
    user: {}
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
            user.permissions = {};
            action.permissions.map((p) => {
                user.permissions[p.alias] = p.value;
            });
            return _.assign({}, state, {
                user: user
            });
        default:
            return state;
    }
}