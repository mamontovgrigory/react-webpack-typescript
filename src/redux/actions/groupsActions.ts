import {sendRequest} from './requestActions';

export const GROUPS_REQUEST_FINISHED = 'GROUPS_REQUEST_FINISHED';

function groupsRequestFinished(groups) {
    return {type: GROUPS_REQUEST_FINISHED, groups};
}

export function groupsRequest() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_groups.php'
        })).then(function (result) {
            dispatch(groupsRequestFinished(result));
        });
    });
}