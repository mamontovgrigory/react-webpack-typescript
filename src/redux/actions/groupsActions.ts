import { sendRequest } from './requestActions';

export const GROUPS_REQUEST_FINISHED = 'groups/GROUPS_REQUEST_FINISHED';

function groupsRequestFinished(groups) {
    return {type: GROUPS_REQUEST_FINISHED, groups};
}

interface Group {
    id?: number;
    name: string;
    settings?: any;
}

interface DeleteGroupsProps {
    ids: string[];
}

export function getGroups() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Groups/GetList'
        })).then(function (result) {
            dispatch(groupsRequestFinished(result));
        });
    });
}

export function saveGroup(properties: Group) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Groups/Save',
            data: properties
        })).then(function () {
            dispatch(getGroups());
        });
    });
}

export function deleteGroups(data: DeleteGroupsProps) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Groups/Delete',
            data
        })).then(function () {
            dispatch(getGroups());
        });
    });
}