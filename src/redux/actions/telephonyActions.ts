import {sendRequest} from './requestActions';

export const UPDATE_DATE_REQUEST_FINISHED: string = 'telephony/UPDATE_DATE_REQUEST_FINISHED';
export const CLIENTS_REQUEST_FINISHED: string = 'telephony/CLIENTS_REQUEST_FINISHED';
export const LOGIN_IDS: string = 'telephony/LOGIN_IDS';
export const CALLS_TOTALS: string = 'telephony/CALLS_TOTALS';
export const CALLS_DETAILS: string = 'telephony/CALLS_DETAILS';
export const PERIOD: string = 'telephony/PERIOD';
export const DURATION: string = 'telephony/DURATION';

function updateDateRequestFinished(updateDate) {
    return {type: UPDATE_DATE_REQUEST_FINISHED, updateDate};
}

function clientsRequestFinished(clients) {
    return {type: CLIENTS_REQUEST_FINISHED, clients};
}

function checkedClients(loginIds) {
    return {type: LOGIN_IDS, loginIds};
}

function callsTotals(callsTotals) {
    return {type: CALLS_TOTALS, callsTotals};
}

function callsDetails(callsDetails) {
    return {type: CALLS_DETAILS, callsDetails};
}

function period(from, to){
    return {type: PERIOD, from, to};
}

function duration(duration){
    return {type: DURATION, duration};
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
            let clients = result.map((client) => {
                return _.assign(client, {
                    checked: true
                });
            });
            dispatch(clientsRequestFinished(clients));
        });
    });
}

export function setPeriod(from:string, to:string){
    return (dispatch => {
        dispatch(period(from, to));
    });
}

export function setDuration(result:number){
    return (dispatch => {
        dispatch(duration(result));
    });
}

export function setClients(clients){
    return (dispatch => {
        dispatch(clientsRequestFinished(clients));
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
    login:string;
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