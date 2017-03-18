import {LOG_IN, LOG_OUT} from '../actions/accountActions';

interface IUser {
    login?:string;
}

interface State {
    authorized:boolean;
    message?:string;
    account:IUser
}

interface Action {
    type:string;
    message?:string;
    account?:IUser
}

const initialState:State = {
    authorized: false.valueOf(),
    account: {}
};

export default function (state:State = initialState, action:Action) {
    switch (action.type) {
        case LOG_IN:
            return _.assign({}, state, {
                authorized: true,
                account: action.account
            });
        case LOG_OUT:
            return _.assign({}, state, {authorized: false, message: action.message});
        default:
            return state;
    }
}