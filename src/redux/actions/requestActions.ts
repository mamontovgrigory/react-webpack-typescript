import * as formData from 'form-urlencoded';

import {showLoader, hideLoader} from './loaderActions';

interface RequestProps {
    url: string;
    method?: string;
    contentType?: string;
    credentials?: string;
    data?: any;
}

export function sendRequest(properties: RequestProps, callback?: Function) {
    return (dispatch => {
        dispatch(showLoader());

        return fetch((NODE_ENV.trim() === 'development' ?
                'http://xn----7sbhtgckcrdddi.xn--p1ai' :
                window.location.origin) + properties.url, { //TODO: Move to config
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

