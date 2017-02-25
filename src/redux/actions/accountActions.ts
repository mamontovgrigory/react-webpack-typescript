import {sendRequest} from './requestActions';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

interface logInProps {
    login:string;
    password:string;
}

export function loginRequest(properties:logInProps) {
    return (dispatch => {
        if (properties.login && properties.password) {
            dispatch(sendRequest({
                url: '/ajax/login.php',
                data: properties
            }, authorization));
        } else {
            dispatch(logout(i18next.t('inputLoginAndPassword')));
        }
    });
}

export function authorization(result){
    return(dispatch => {
        dispatch(result ? login() : logout(i18next.t('wrongLoginOrPassword')));
    })
}

export function login() {
    return {type: LOG_IN};
}

export function logout(message?:string) {
    return {type: LOG_OUT, message};
}
