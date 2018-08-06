import { IUserPermissions } from 'models/account';
import { sendRequest } from './requestActions';

export const UPDATE_DATE_REQUEST_FINISHED: string = 'telephony/UPDATE_DATE_REQUEST_FINISHED';
export const CLIENTS_REQUEST_FINISHED: string = 'telephony/CLIENTS_REQUEST_FINISHED';
export const CALLS_TOTALS: string = 'telephony/CALLS_TOTALS';
export const CALLS_DETAILS: string = 'telephony/CALLS_DETAILS';
export const PERIOD: string = 'telephony/PERIOD';
export const DURATION: string = 'telephony/DURATION';
export const UNIQUE_COMMENTS: string = 'telephony/UNIQUE_COMMENTS';

function updateDateRequestFinished(updateDate) {
    return {type: UPDATE_DATE_REQUEST_FINISHED, updateDate};
}

function clientsRequestFinished(clients, groups) {
    return {type: CLIENTS_REQUEST_FINISHED, clients, groups};
}

function callsTotals(callsTotals) {
    return {type: CALLS_TOTALS, callsTotals};
}

function callsDetails(callsDetails) {
    return {type: CALLS_DETAILS, callsDetails};
}

function period(from, to) {
    return {type: PERIOD, from, to};
}

function duration(duration) {
    return {type: DURATION, duration};
}

function uniqueComments(uniqueComments) {
    return {type: UNIQUE_COMMENTS, uniqueComments};
}

export function getUpdateDate() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Telephony/GetLastLog'
        })).then(function (result) {
            dispatch(updateDateRequestFinished(result && result.datetime ? result.datetime : null));
        });
    });
}

export function getClients(permissions: IUserPermissions) {
    return ((dispatch) => {
        dispatch(sendRequest({
            url: '/Api/Cabinets/GetList'
        })).then(function (cabinets) {
            let groups = [];
            let clients = [];
            if (cabinets) {
                cabinets.map((cabinet) => {
                    dispatch(sendRequest({
                        url: '/Api/Clients/GetList',
                        data: {
                            parentId: cabinet.id
                        }
                    })).then(function (result) {
                        result = result.filter((client) => {
                            return parseInt(client.active) === 1 && parseInt(client.deleted) === 0;
                        });
                        groups.push({
                            name: cabinet.name,
                            ids: result.map(client => client.id)
                        });
                        clients = clients.concat(result);

                        let enabledClients: string[] = permissions && permissions.telephonyClients ? permissions.telephonyClients : [];
                        clients = clients.filter((client) => {
                            return enabledClients.length === 1 && enabledClients[0] === 'all' || enabledClients.indexOf(String(client.id)) !== -1;
                        }).map((client) => {
                            return _.assign(client, {
                                checked: true
                            });
                        });

                        dispatch(clientsRequestFinished(_.sortBy(clients, [function(o) { return o.login; }]),
                            _.sortBy(groups, [function(o) { return o.name; }])));
                    });
                })
            }
        });
    });
}

export function setPeriod(from: string, to: string) {
    return (dispatch => {
        dispatch(period(from, to));
    });
}

export function setDuration(result: number) {
    return (dispatch => {
        dispatch(duration(result));
    });
}

export function setClients(clients, groups) {
    return (dispatch => {
        dispatch(clientsRequestFinished(clients, groups));
    });
}

interface GetCallsTotalsProps {
    from: string;
    to: string;
    loginIds: any[];
    duration?: number;
}

export function getCallsTotals(data: GetCallsTotalsProps) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Calls/GetTotals',
            data
        })).then(function (result) {
            dispatch(getCallsTotalsObjective(data, result));
        });
    });
}

export function getCallsTotalsObjective(data: GetCallsTotalsProps, callsTotalsData) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Calls/GetTotalsObjective',
            data
        })).then(function (result) {
            Object.keys(callsTotalsData.data).map((login) => {
                callsTotalsData.data[login] = callsTotalsData.data[login].map((count, index) => {
                    const date = callsTotalsData.dates[index];
                    const objectiveData = _.find(result, (o) => {
                        return o.login === login && o.date === date;
                    });

                    return {
                        count: parseInt(count),
                        objectiveCount: objectiveData ? parseInt(objectiveData.count) : 0
                    }
                });
            });
            dispatch(callsTotals(callsTotalsData));
        });
    });
}

export function resetCallsTotals() {
    return (dispatch => {
        dispatch(callsTotals({
            dates: [],
            data: []
        }));
    });
}

interface GetCallsDetailsProps {
    loginIds: number[];
    from: string;
    to: string;
    duration?: number;
}

export function getCallsDetails(data: GetCallsDetailsProps, callback: Function) {//TODO: escape using callback
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Calls/GetDetails',
            data
        })).then(function (result) {
            callback(result);
            //dispatch(callsDetails(result));
        });
    });
}

interface GetRecordProps {
    login: string;
    callid: string;
}

export function getRecord(data: GetRecordProps, callback: Function) {//TODO: escape using callback
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Records/Download',
            data
        })).then(function (result) {
            let src = (NODE_ENV.trim() === 'development' ?
                    'http://localhost' :
                    window.location.origin) + result.src; //TODO: Move to config
            callback({
                src
            });
            //dispatch(callsDetails(result));
        });
    });
}

interface ISaveCommentsProps {
    id?: number,
    callid?: string,
    loginId: number;
    numfrom?: string;
    time?: string;
    mark?: string;
    model?: string;
    comment?: string;
    objective?: string;
    moderation?: string;
    client?: string;
    manager?: string;
}

export function saveComments(data: ISaveCommentsProps, callback?: Function) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Comments/Save',
            data
        })).then(function () {
            if (callback) callback();
            //dispatch(callsDetails(result));
        });
    });
}

export function deleteComments(data: {ids: number[]}, callback?: Function) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Comments/Delete',
            data
        })).then(function () {
            if (callback) callback();
        });
    });
}

interface IGetUniqueComments {
    loginId: number;
}

export function getUniqueComments(data: IGetUniqueComments, callback: Function) {//TODO: escape using callback
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Comments/GetUnique',
            data
        })).then(function (result) {
            callback(result);
            //dispatch(uniqueComments(result));
        });
    });
}