import {IUser, IUserPermissions} from 'models/account';
import {sendRequest} from './requestActions';
import {getModules} from './navigationActions';
import {getClients, resetCallsTotals} from './telephonyActions';

export const LOG_IN: string = 'account/LOG_IN';
export const LOG_OUT: string = 'account/LOG_OUT';
export const PERMISSIONS: string = 'account/PERMISSIONS';

export function login(user: IUser) {
    return {type: LOG_IN, user};
}

export function logout(message?: string) {
    return {type: LOG_OUT, message};
}

export function permissions(permissions: IUserPermissions) {
    return {type: PERMISSIONS, permissions};
}

interface ILogIn {
    login: string;
    password: string;
}

export function loginRequest(properties: ILogIn) {
    return (dispatch => {
        if (properties.login && properties.password) {
            dispatch(sendRequest({
                url: '/Api/Users/Login',
                method: 'POST',
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
            url: '/Api/Users/Logout',
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
            url: '/Api/Users/CheckSession',
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
    stockManage: 'stock_manage',
    telephonyCabinetsManage: 'telephony_cabinets_manage',
    telephonyCommentsManage: 'telephony_comments_manage',
    telephonyCommentsView: 'telephony_comments_view',
    telephonyClients: 'list_users',
};

export function getAccountPermissions() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Users/GetAccount'
        })).then(function (response) {
            let result: IUserPermissions = {
                usersManage: false,
                groupsManage: false,
                stockManage: false,
                telephonyCabinetsManage: false,
                telephonyCommentsManage: false,
                telephonyCommentsView: false,
                telephonyClients: []
            };
            if (response) {
                _.forEach(result, function (value, key) {
                    let alias = permissionsMapping[key];
                    if (alias) {
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