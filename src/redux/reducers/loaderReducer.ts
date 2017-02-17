import {SHOW_LOADER, HIDE_LOADER} from  '../actions/loaderActions';

interface State {
    active:boolean;
}

interface Action {
    type:string;
}

const initialState:State = {
    active: false
};

export default function (state:State = initialState, action:Action) {
    switch (action.type) {
        case SHOW_LOADER:
            return _.assign({}, state, {active: true});
        case HIDE_LOADER:
            return _.assign({}, state, {active: false});
        default:
            return state;
    }
}