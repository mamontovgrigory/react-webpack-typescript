import {sendRequest} from './requestActions';

export const LOG_IN = 'account/LOG_IN';
export const LOG_OUT = 'account/LOG_OUT';

export function login(account) {
    return {type: LOG_IN, account};
}

export function logout(message?:string) {
    return {type: LOG_OUT, message};
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
                dispatch(result ? login(result) : logout(i18next.t('wrongLoginOrPassword')));
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
        });
    });
}

export function checkSession(){
    return(dispatch => {
        dispatch(sendRequest({
            url: '/ajax/check_session.php',
            credentials: 'include'
        })).then(function (result) {
            if(result) dispatch(login(result));
        });
    });
}