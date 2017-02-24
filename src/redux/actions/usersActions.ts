import {request} from './requestActions';

export const USERS_REQUEST_FINISHED = 'USERS_REQUEST_FINISHED';

function usersRequestFinished(users) {
    return {type: USERS_REQUEST_FINISHED, users};
}

export function usersRequest() {
    return (dispatch => {
        dispatch(request({
            url: '/ajax/get_users.php'
        }, usersRequestFinished));
    });
}

