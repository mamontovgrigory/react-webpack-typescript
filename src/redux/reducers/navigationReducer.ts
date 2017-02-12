import * as i18next from 'i18next';

i18next.init({ //TODO: declare global i18next
    lng: 'ru',
    resources: require('../../i18n.json')
});

interface State {
    modules:NavigationItem[];
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

