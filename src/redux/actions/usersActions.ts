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

export function saveUser(properties: User) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Users/Save',
            data: properties
        })).then(function () {
            dispatch(getUsers());
        });
    });
}

export function deleteUsers(properties: DeleteUsersProps) {
    return (dispatch => {
        _.forEach(properties.ids, function (id) { //TODO: send ids array
            dispatch(sendRequest({
                url: '/Api/Users/Delete',
                data: {
                    id: id
                }
            })).then(function () {
                dispatch(getUsers());
            });
        });
    });
}