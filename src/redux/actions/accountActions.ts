import {sendRequest} from './requestActions';
import {getModules} from './navigationActions';

export const LOG_IN = 'account/LOG_IN';
export const LOG_OUT = 'account/LOG_OUT';
export const PERMISSIONS = 'account/PERMISSIONS';

export function login(user) {
    return {type: LOG_IN, user};
}

export function logout(message?:string) {
    return {type: LOG_OUT, message};
}

export function permissions(permissions) {
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

export function logoutRequest() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/logout.php',
            credentials: 'include'
        })).then(function () {
            dispatch(logout());
            dispatch(getModules());
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

export function getAccountPermissions() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_account.php'
        })).then(function (result) {
            if (result){
                dispatch(permissions(result));
                dispatch(getModules(result));
            }
        });
    });
}