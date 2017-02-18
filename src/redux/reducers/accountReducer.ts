import {LOG_IN, LOG_OUT} from '../actions/accountActions';

interface State {
    authorized:boolean;
    message?:string;
}

interface Action {
    type:string;
    message?:string;
}

const initialState:State = {
    authorized:false
};

export default function (state:State = initialState, action:Action) {
    console.log(action);
    switch(action.type){
        case LOG_IN:
            return _.assign({}, state, {authorized: true});
        case LOG_OUT:
            return _.assign({}, state, {authorized: false, message: action.message});
        default:
            return state;
    }
}