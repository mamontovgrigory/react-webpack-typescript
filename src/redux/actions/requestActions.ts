import * as formData from 'form-urlencoded';

import {showLoader, hideLoader} from './loaderActions';

interface RequestProps{
    url:string;
    method?:string;
    contentType?:string;
    data?:any;
    success?:Function;
    error?:Function;
}

export function request(properties:RequestProps, action?:any) {
    return (dispatch => {
        dispatch(showLoader());

        return fetch((NODE_ENV === 'development' ?
                'http://ramazanavtsinov.myjino.ru' :
                window.location.origin) + properties.url, { //TODO: Move to config
            method: properties.method ? properties.method : 'POST',
            headers: {
                'Content-type': properties.contentType ? properties.contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: formData(properties.data)
        })
            .then(res => res.json())
            .then(result => {
                dispatch(hideLoader());
                if(action) dispatch(action(result));
                if(properties.success) properties.success(result);
            })
            .catch(({errors}) => {
                console.error(errors);
                if(properties.error) properties.error(errors);
            });
    });
}

