interface State {
    modules:{
        path?:string;
        name:any;
        src?:string;
        icon?:string;
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
            name: i18next.t('users'),
            to: 'users',
            icon: 'perm_identity',
            src: require('./content/users.png')
        },
        {
            name: i18next.t('groups'),
            to: 'groups',
            icon: 'supervisor_account',
            src: require('./content/groups.png')
        },
        {
            name: i18next.t('telephony'),
            to: 'telephony',
            icon: 'phone',
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

