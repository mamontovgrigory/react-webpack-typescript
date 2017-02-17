import {LOG_IN, LOG_OUT} from '../actions/accountActions';

interface State {
    authorized:boolean;
}

interface Action {
    type:string;
}

const initialState:State = {
    authorized:false
};

export default function (state:State = initialState, action:Action) {
    switch(action.type){
        case LOG_IN:
            console.log(action);
            return _.assign({}, state, {authorized: true});
        case LOG_OUT:
            return _.assign({}, state, {authorized: false});
        default:
            return state;
    }
}