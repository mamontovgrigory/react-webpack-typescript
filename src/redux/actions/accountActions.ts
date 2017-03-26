import {IUser, IUserPermissions} from "models/account";
import {sendRequest} from './requestActions';
import {getModules} from './navigationActions';
import {getClients, resetCallsTotals} from './telephonyActions';

export const LOG_IN = 'account/LOG_IN';
export const LOG_OUT = 'account/LOG_OUT';
export const PERMISSIONS = 'account/PERMISSIONS';

export function login(user:IUser) {
    return {type: LOG_IN, user};
}

export function logout(message?:string) {
    return {type: LOG_OUT, message};
}

export function permissions(permissions:IUserPermissions) {
    return {type: PERMISSIONS, permissions};
}

interface ILogIn {
    login:string;
    password:string;
}

export function loginRequest(properties:ILogIn) {
    return (dispatch => {
        if (properties.login && properties.password) {
            dispatch(sendRequest({
                url: '/ajax/login.php',
                data: properties
            })).then(function (result) {
                if (result) {
                    dispatch(login(result));
                    dispatch(getAccountPermissions());
                } else {
                    dispatch(logout(i18next.t('wrongLoginOrPassword')));
                }
            });
        } else {
            dispatch(logout(i18next.t('inputLoginAndPassword')));
        }
    });
}

export function logoutRequest() { //TODO: Change route to /
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/logout.php',
            credentials: 'include'
        })).then(function () {
            dispatch(logout());
            dispatch(getAccountPermissions());
        });
    });
}

export function checkSession() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/check_session.php',
            credentials: 'include'
        })).then(function (result) {
            if (result) {
                dispatch(login(result));
                dispatch(getAccountPermissions());
            }
        });
    });
}

let permissionsMapping = {
    usersManage: 'users_manage',
    groupsManage: 'groups_manage',
    telephonyManage: 'telephony_manage',
    telephonyClients: 'list_users',
};

export function getAccountPermissions() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_account.php'
        })).then(function (response) {
            let result:IUserPermissions = {
                usersManage: false,
                groupsManage: false,
                telephonyManage: false,
                telephonyClients: []
            };
            if (response) {
                _.forEach(result, function (value, key) {
                    let alias = permissionsMapping[key];
                    if(alias){
                        let permission = response.find((p) => {
                            return p.alias === alias;
                        });
                        result[key] = permission ? permission.value : false;
                    }
                });
            }
            dispatch(permissions(result));
            dispatch(getModules(result));//TODO: Update data outside account actions
            dispatch(getClients(result));
            dispatch(resetCallsTotals());
        });
    });
}