export const USERS_REQUEST_STARTED = 'USERS_REQUEST_STARTED';
export const USERS_REQUEST_FINISHED = 'USERS_REQUEST_FINISHED';
export const USERS_REQUEST_ERROR = 'USERS_REQUEST_ERROR';

function usersRequestStarted() {
    return {type: USERS_REQUEST_STARTED};
}

function usersRequestFinished(users) {
    return {type: USERS_REQUEST_FINISHED, users};
}

function usersRequestError(errors) {
    return {type: USERS_REQUEST_ERROR, errors};
}

export function usersRequest() {
    return (dispatch => {
        dispatch(usersRequestStarted());

        return fetch('http://ramazanavtsinov.myjino.ru/ajax/get_users.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(result => {
                dispatch(usersRequestFinished(result));
            })
            .catch(({errors}) => dispatch(usersRequestError(errors)));
    });
}

