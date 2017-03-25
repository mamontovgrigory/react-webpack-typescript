import {MODULES} from 'redux/actions/navigationActions';
import {IModule} from 'models/navigation';

interface State {
    modules:IModule[];
}

interface Action {
    type:string;
    modules:IModule[];
}

const initialState:State = {
    modules: []
};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        case MODULES:
            return _.assign({}, state, {
                modules: action.modules.filter((m) => {
                    return m.enabled;
                })
            });
        default:
            return state;
    }
}

