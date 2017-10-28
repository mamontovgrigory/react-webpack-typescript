import * as formData from 'form-urlencoded';

import { showLoader, hideLoader } from './loaderActions';

interface RequestProps {
    url: string;
    host?: string;
    method?: string;
    contentType?: string;
    credentials?: string;
    data?: any;
}

export function sendRequest(properties: RequestProps, callback?: Function) {
    return (dispatch => {
        dispatch(showLoader());
        const host = properties.host ? properties.host : 'http://localhost:8889';
            /*(NODE_ENV.trim() === 'development' ?
            'http://localhost:8889' :
            window.location.origin);*/
        return fetch(host + properties.url, { //TODO: Move to config
            method: properties.method ? properties.method : 'POST',
            credentials: 'include',
            headers: {
                'Content-type': properties.contentType ? properties.contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: formData(properties.data)
        })
            .then(res => res.json())
            .then(result => {
                dispatch(hideLoader());
                return (result);
            })
            .catch(({errors}) => {
                console.error(errors);
                return (errors);
            });
    });
}

