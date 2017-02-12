interface State {
    breadcrumbs:{
        name:string;
        href:string;
    }[]
}

interface Action {
    type:string;
}

const initialState:State = {
    breadcrumbs: []
};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        default:
            return state;
    }
}