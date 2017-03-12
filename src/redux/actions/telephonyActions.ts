import {sendRequest} from './requestActions';

export const UPDATE_DATE_REQUEST_FINISHED = 'UPDATE_DATE_REQUEST_FINISHED';
export const CLIENTS_REQUEST_FINISHED = 'CLIENTS_REQUEST_FINISHED';
export const CHECKED_CLIENTS = 'CHECKED_CLIENTS';
export const CALLS_TOTALS = 'CALLS_TOTALS';
export const CALLS_DETAILS = 'CALLS_DETAILS';

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

function callsDetails(callsDetails) {
    return {type: CALLS_DETAILS, callsDetails};
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

interface GetCallsTotalsProps {
    from:string;
    to:string;
    loginIds:any[];
    duration?:number;
}

export function getCallsTotals(data:GetCallsTotalsProps) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_calls_totals.php',
            data
        })).then(function (result) {
            dispatch(callsTotals(result));
        });
    });
}

interface GetCallsDetailsProps{
    loginId:string;
    date:string;
    duration?:number;
}

export function getCallsDetails(data:GetCallsDetailsProps, callback:Function) {//TODO: escape using callback
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_calls_details.php',
            data
        })).then(function (result) {
            callback(result);
            //dispatch(callsDetails(result));
        });
    });
}

interface GetRecordProps{
    callid:string;
}

export function getRecord(data:GetRecordProps, callback:Function){//TODO: escape using callback
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_call_record.php',
            data
        })).then(function (result) {
            callback(result);
            //dispatch(callsDetails(result));
        });
    });
}