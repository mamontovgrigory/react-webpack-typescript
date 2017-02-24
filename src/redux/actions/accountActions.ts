require('es6-promise').polyfill();
import * as formData from 'form-urlencoded';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

interface logInProps {
    login:string;
    password:string;
}

export function logIn(properties:logInProps, dispatch) {
    return fetch('http://ramazanavtsinov.myjino.ru/ajax/login.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formData(properties)
    })
        .then(res => res.json())
        .then(result => {
            if (result) {
                //return {type: LOG_IN};
                dispatch({type: LOG_IN});
            } else {
                dispatch({type: LOG_OUT});
                //return {type: LOG_OUT};
            }
        });
}

export function logOut() {
    return {type: LOG_OUT};
}