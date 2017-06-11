import {sendRequest} from './requestActions';

export const GROUPS_REQUEST_FINISHED = 'groups/GROUPS_REQUEST_FINISHED';

function groupsRequestFinished(groups) {
    return {type: GROUPS_REQUEST_FINISHED, groups};
}

interface Group{
    id?:number;
    name:string;
    settings?:any;
}

interface DeleteGroupsProps{
    ids:string[];
}

export function getGroups() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_groups.php'
        })).then(function (result) {
            dispatch(groupsRequestFinished(result));
        });
    });
}

export function saveGroup(properties: Group){
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/group_save.php',
            data: properties
        })).then(function () {
            dispatch(getGroups());
        });
    });
}

export function deleteGroups(properties:DeleteGroupsProps){
    return (dispatch => {
        _.forEach(properties.ids, function(id){ //TODO: send ids array
            dispatch(sendRequest({
                url: '/ajax/group_delete.php',
                data: {
                    id: id
                }
            })).then(function () {
                dispatch(getGroups());
            });
        });
    });
}