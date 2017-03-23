export const MODULES = 'account/MODULES';

export function modules(modules) {
    return {type: MODULES, modules};
}

let initialModules = [ //TODO: Move from actions file
    {
        name: i18next.t('users'),
        to: 'users',
        icon: 'perm_identity',
        src: require('./content/users.png'),
        rule: 'users_manage'
    },
    {
        name: i18next.t('groups'),
        to: 'groups',
        icon: 'supervisor_account',
        src: require('./content/groups.png'),
        rule: 'groups_manage'
    },
    {
        name: i18next.t('telephony'),
        to: 'telephony',
        icon: 'phone',
        src: require('./content/telephony.png')
    }
];

export function getModules(permissions?:any){
    return(dispatch => {
        dispatch(modules(initialModules.filter((m:any) => {
            let rule = permissions ? permissions.find((p) => {
               return p.alias === m.rule;
            }) : null;
            return !m.rule || (rule && rule.value);
        })));
    });
}