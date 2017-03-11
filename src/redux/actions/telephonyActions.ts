import {sendRequest} from './requestActions';

export const UPDATE_DATE_REQUEST_FINISHED = 'UPDATE_DATE_REQUEST_FINISHED';
export const CLIENTS_REQUEST_FINISHED = 'CLIENTS_REQUEST_FINISHED';
export const CHECKED_CLIENTS = 'CHECKED_CLIENTS';
export const CALLS_TOTALS = 'CALLS_TOTALS';

function updateDateRequestFinished(updateDate) {
    return {type: UPDATE_DATE_REQUEST_FINISHED, updateDate};
}

function clientsRequestFinished(clients) {
    return {type: CLIENTS_REQUEST_FINISHED, clients};
}

function checkedClients(checkedClientsIds) {
    return {type: CHECKED_CLIENTS, checkedClientsIds};
}

function callsTotals(callsTotals) {
    return {type: CALLS_TOTALS, callsTotals};
}

export function getUpdateDate() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_update_date.php'
        })).then(function (result) {
            dispatch(updateDateRequestFinished(result && result.datetime ? result.datetime : null));
        });
    });
}

export function getClients() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_list_users.php'
        })).then(function (result) {
            dispatch(clientsRequestFinished(result));
        });
    });
}

export function setCheckedClients(checkedClientsIds) {
    return (dispatch => {
        dispatch(checkedClients(checkedClientsIds));
    });
}

interface getCallsTotals {
    from:string;
    to:string;
    loginIds:any[];
    duration?:number;
}

export function getCallsTotals(data:getCallsTotals) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_calls_totals.php',
            data
        })).then(function (result) {
            dispatch(callsTotals(result));
        });
    });
}