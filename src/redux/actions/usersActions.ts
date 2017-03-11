import {sendRequest} from './requestActions';

export const USERS_REQUEST_FINISHED = 'USERS_REQUEST_FINISHED';

interface User {
    id?:string;
    login:string;
    groupId:string;
    password?:string;
}

interface DeleteUsersProps{
    ids:string[];
}

function usersRequestFinished(users:User[]) {
    return {type: USERS_REQUEST_FINISHED, users};
}

export function getUsers() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_users.php'
        })).then(function (result) {
            dispatch(usersRequestFinished(result));
        });
    });
}

export function saveUser(properties: User){
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/user_save.php',
            data: properties
        })).then(function () {
            dispatch(getUsers());
        });
    });
}

export function deleteUsers(properties:DeleteUsersProps){
    return (dispatch => {
        _.forEach(properties.ids, function(id){ //TODO: send ids array
            dispatch(sendRequest({
                url: '/ajax/user_delete.php',
                data: {
                    id: id
                }
            })).then(function () {
                dispatch(getUsers());
            });
        });
    });
}