import {sendRequest} from './requestActions';

export const USERS_REQUEST_FINISHED = 'users/USERS_REQUEST_FINISHED';

interface User {
    id?: string;
    login: string;
    groupId: string;
    password?: string;
}

interface DeleteUsersProps {
    ids: string[];
}

function usersRequestFinished(users: User[]) {
    return {type: USERS_REQUEST_FINISHED, users};
}

export function getUsers() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Users/GetList'
        })).then(function (result) {
            dispatch(usersRequestFinished(result));
        });
    });
}

export function saveUser(data: User) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Users/Save',
            data
        })).then(function () {
            dispatch(getUsers());
        });
    });
}

export function deleteUsers(data: DeleteUsersProps) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Users/Delete',
            data
        })).then(function () {
            dispatch(getUsers());
        });
    });
}