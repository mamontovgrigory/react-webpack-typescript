interface State {
    authorized:boolean;
}

interface Action {
    type:string;
}

const initialState:State = {
    authorized:false
};

export default function (state:State = initialState, action:Action) {
    switch(action.type){
        default:
            return state;
    }
}