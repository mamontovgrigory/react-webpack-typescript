import {ICabinet} from 'models/cabinets';
import {CABINETS} from '../actions/cabinetsActions';

interface State {
    cabinets: ICabinet[];
}

interface Action {
    type: string;
    cabinets: ICabinet[];
}

const initialState: State = {
    cabinets: []
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case CABINETS:
            return _.assign({}, state, {
                cabinets: action.cabinets
            });
        default:
            return state;
    }
}