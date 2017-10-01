import {sendRequest} from './requestActions';

export const PERMISSIONS_REQUEST_FINISHED = 'permissions/PERMISSIONS_REQUEST_FINISHED';

function permissionsRequestFinished(permissions) {
    return {type: PERMISSIONS_REQUEST_FINISHED, permissions};
}

export function getPermissions() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Permissions/GetList'
        })).then(function (result) {
            dispatch(permissionsRequestFinished(result));
        });
    });
}