import {IUserPermissions} from 'models/account';
import {sendRequest} from './requestActions';

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

function clientsRequestFinished(clients) {
    return {type: CLIENTS_REQUEST_FINISHED, clients};
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
            url: '/ajax/get_update_date.php'
        })).then(function (result) {
            dispatch(updateDateRequestFinished(result && result.datetime ? result.datetime : null));
        });
    });
}

export function getClients(permissions: IUserPermissions) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_list_users.php'
        })).then(function (result) {
            let enabledClients: string[] = permissions && permissions.telephonyClients ? permissions.telephonyClients : [];
            let clients = result.filter((client) => {
                return enabledClients.length === 1 && enabledClients[0] === 'all' || enabledClients.indexOf(client.id) !== -1;
            }).map((client) => {
                return _.assign(client, {
                    checked: true
                });
            });
            dispatch(clientsRequestFinished(clients));
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

export function setClients(clients) {
    return (dispatch => {
        dispatch(clientsRequestFinished(clients));
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
            url: '/ajax/get_calls_totals.php',
            data
        })).then(function (result) {
            dispatch(getCallsTotalsObjective(data, result));
        });
    });
}

export function getCallsTotalsObjective(data: GetCallsTotalsProps, callsTotalsData) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_calls_totals_objective.php',
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
    loginId: string;
    date: string;
    duration?: number;
}

export function getCallsDetails(data: GetCallsDetailsProps, callback: Function) {//TODO: escape using callback
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

interface GetRecordProps {
    login: string;
    callid: string;
}

export function getRecord(data: GetRecordProps, callback: Function) {//TODO: escape using callback
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_call_record.php',
            data
        })).then(function (result) {
            let src = (NODE_ENV.trim() === 'development' ?
                    'http://xn----7sbhtgckcrdddi.xn--p1ai' :
                    window.location.origin) + '/ajax' + result.src; //TODO: Move to config
            callback({
                src
            });
            //dispatch(callsDetails(result));
        });
    });
}

interface ISaveCommentsProps {
    id: string,
    loginId: string;
    mark?: string;
    model?: string;
    comment?: string;
    objective?: string;
}

export function saveComments(data: ISaveCommentsProps, callback?: Function) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/comments_save.php',
            data: {
                id: data.id,
                login_id: data.loginId,
                mark: data.mark,
                model: data.model,
                comment: data.comment,
                objective: data.objective
            }
        })).then(function () {
            if (callback) callback();
            //dispatch(callsDetails(result));
        });
    });
}

interface IGetUniqueComments {
    loginId: string;
}

export function getUniqueComments(data: IGetUniqueComments, callback: Function) {//TODO: escape using callback
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_unique_comments.php',
            data: {
                login_id: data.loginId
            }
        })).then(function (result) {
            callback(result);
            //dispatch(uniqueComments(result));
        });
    });
}