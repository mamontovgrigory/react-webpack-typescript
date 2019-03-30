import {IUserPermissions} from 'models/account';
import {IModule} from 'models/navigation';

export const MODULES = 'navigation/MODULES';

export function modules(modules: IModule[]) {
    return {type: MODULES, modules};
}

export function getModules(permissions: IUserPermissions) {
    return (dispatch => {
        let result = [
            {
                name: i18next.t('users'),
                to: '/users',
                icon: 'perm_identity',
                src: require('./content/users.png'),
                enabled: permissions.usersManage
            },
            {
                name: i18next.t('groups'),
                to: '/groups',
                icon: 'supervisor_account',
                src: require('./content/groups.png'),
                enabled: permissions.groupsManage
            },
            {
                name: i18next.t('telephonyCabinets'),
                to: '/cabinets',
                icon: 'contact_phone',
                src: require('./content/cabinets.png'),
                enabled: permissions.telephonyCabinetsManage
            },
            {
                name: i18next.t('telephony'),
                to: '/telephony',
                icon: 'phone',
                src: require('./content/telephony.png'),
                enabled: true
            }
        ];
        dispatch(modules(result));
    });
}