import {USERS_REQUEST_STARTED, USERS_REQUEST_FINISHED, USERS_REQUEST_ERROR} from '../actions/usersActions';

interface State {
    users:any[];
    errors?:any;
    loading:boolean;
}

interface Action {
    type:string;
    users:any[];
    errors?:any;
}

const initialState:State = {
    users: [],
    errors: null,
    loading: false
};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        case USERS_REQUEST_STARTED:
            return Object.assign({}, state, {loading: true, errors: null});
        case USERS_REQUEST_FINISHED:
            return {
                loading: false,
                errors: null,
                users: action.users
            };
        case USERS_REQUEST_ERROR:
            return Object.assign({}, state, {loading: false, errors: action.errors});
        default:
            return state;
    }
}
