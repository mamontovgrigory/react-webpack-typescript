import {PERMISSIONS_REQUEST_FINISHED} from '../actions/permissionsActions';

interface State {
    permissions:any[];
}

interface Action {
    type:string;
    permissions:any[];
}

const initialState:State = {
    permissions: []
};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        case PERMISSIONS_REQUEST_FINISHED:
            return _.assign({}, state, {
                permissions: action.permissions
            });
        default:
            return state;
    }
}
