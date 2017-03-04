import {GROUPS_REQUEST_FINISHED} from '../actions/groupsActions';

interface State {
    groups:any[];
}

interface Action {
    type:string;
    groups:any[];
}

const initialState:State = {
    groups: []
};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        case GROUPS_REQUEST_FINISHED:
            return _.assign({}, state, {
                groups: action.groups
            });
        default:
            return state;
    }
}
