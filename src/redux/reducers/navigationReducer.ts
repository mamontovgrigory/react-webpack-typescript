interface State {
    modules:{
        path?:string;
        name:string;
        src?:string;
        description?:string;
        to:string;
    }[];
}

interface Action {
    type:string;
}

const initialState:State = {
    modules: [
        {
            name: 'Users',
            to: 'users',
            src: require('./content/users.png')
        },
        {
            name: 'Groups',
            to: 'groups',
            src: require('./content/groups.png')
        },
        {
            name: 'Telephony',
            to: 'telephony',
            src: require('./content/telephony.png')
        }
    ]
};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        default:
            return state;
    }
}

