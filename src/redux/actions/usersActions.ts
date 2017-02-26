import {sendRequest} from './requestActions';

export const USERS_REQUEST_FINISHED = 'USERS_REQUEST_FINISHED';

interface User{
    id:string;
    login:string;
    groupId:string;
}

function usersRequestFinished(users:User[]) {
    return {type: USERS_REQUEST_FINISHED, users};
}

export function usersRequest() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_users.php'
        })).then(function(result){
            dispatch(usersRequestFinished(result));
        });
    });
}