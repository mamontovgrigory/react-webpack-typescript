import * as formData from 'form-urlencoded';

import {showLoader, hideLoader} from './loaderActions';

interface RequestProps {
    url:string;
    method?:string;
    contentType?:string;
    credentials?:string;
    data?:any;
}

export function sendRequest(properties:RequestProps, callback?:Function) {
    return (dispatch => {
        dispatch(showLoader());

        return fetch((NODE_ENV.trim() === 'development' ?
                'http://ramazanavtsinov.myjino.ru' :
                window.location.origin) + properties.url, { //TODO: Move to config
            mode: 'cors',
            credentials: properties.credentials ? properties.credentials : null,
            cache: 'no-cache',
            method: properties.method ? properties.method : 'POST',
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

