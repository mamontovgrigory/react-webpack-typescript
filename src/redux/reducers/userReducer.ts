import {USER_DATA} from '../actions/userActions';

interface State {
    name?:string;
}

interface Action {
    type:string;
    data?:State;
}

const initialState:State = {name: null};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        case USER_DATA:
            return _.assign({}, state, action.data);
        default:
            return state;
    }
}
