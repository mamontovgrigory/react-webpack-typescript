import {request} from './requestActions';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

interface logInProps {
    login:string;
    password:string;
}

export function login() {
    return {type: LOG_IN};
}

export function authorization(result){
    return(dispatch => {
        dispatch(result ? login() : logout(i18next.t('wrongLoginOrPassword')));
    })
}

export function loginRequest(properties:logInProps) {
    return (dispatch => {
        if (properties.login && properties.password) {
            dispatch(request({
                url: 'http://ramazanavtsinov.myjino.ru/ajax/login.php',
                data: properties
            }, authorization));
        } else {
            dispatch(logout(i18next.t('inputLoginAndPassword')));
        }
    });
}

export function logout(message?:string) {
    return {type: LOG_OUT, message};
}