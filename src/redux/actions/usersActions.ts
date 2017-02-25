import {sendRequest} from './requestActions';
import {initGrid} from './gridActions';

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
        }, usersRequestFinished));
    });
}

export function initUsersGrid(gridId:string, users:User[]){
    initGrid({
        gridId: gridId,
        data: _.map(users, function (r) {
            return {
                id: r.id,
                login: r.login,
                group: r.groupId
            };
        }),
        colModel: [
            {
                name: 'id',
                hidden: true
            },
            {
                name: 'login'
            },
            {
                name: 'group'
            }
        ]
    });
}