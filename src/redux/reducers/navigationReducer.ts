import {MODULES} from "../actions/navigationActions";

interface IModule {
    path?:string;
    name:any;
    src?:string;
    icon?:string;
    description?:string;
    to:string;
    rule?:string;
}

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
                modules: action.modules
            });
        default:
            return state;
    }
}

