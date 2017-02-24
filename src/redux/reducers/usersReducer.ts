import {USERS_REQUEST_FINISHED} from '../actions/usersActions';

interface State {
    users:any[];
}

interface Action {
    type:string;
    users:any[];
}

const initialState:State = {
    users: []
};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        case USERS_REQUEST_FINISHED:
            return _.assign({}, state, {
                users: action.users
            });
        default:
            return state;
    }
}
