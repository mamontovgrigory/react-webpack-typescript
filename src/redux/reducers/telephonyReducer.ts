import * as moment from 'moment';

import {
    UPDATE_DATE_REQUEST_FINISHED,
    CLIENTS_REQUEST_FINISHED,
    CHECKED_CLIENTS,
    CALLS_TOTALS
} from 'redux/actions/telephonyActions';

interface Client {
    id:string;
    login:string;
}

interface CallsTotals {
    dates:any[],
    data:any[]
}

interface State {
    updateDate:string;
    clients:Client[];
    checkedClientsIds:string[];
    callsTotals:CallsTotals
}

interface Action {
    type:string;
    updateDate?:string;
    clients?:Client[];
    checkedClientsIds?:string[];
    callsTotals?:CallsTotals
}

const initialState:State = {
    updateDate: '',
    clients: [],
    checkedClientsIds: [],
    callsTotals: {
        dates: [],
        data: []
    }
};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        case UPDATE_DATE_REQUEST_FINISHED:
            return _.assign({}, state, {
                updateDate: moment(action.updateDate).format('HH:mm:ss DD.MM.YYYY') //TODO: Move to config
            });
        case CLIENTS_REQUEST_FINISHED:
            return _.assign({}, state, {
                clients: action.clients,
                checkedClientsIds: action.clients.map((client) => {
                    return client.id;
                })
            });
        case CHECKED_CLIENTS:
            return _.assign({}, state, {
                checkedClientsIds: action.checkedClientsIds
            });
        case CALLS_TOTALS:
            return _.assign({}, state, {
                callsTotals: action.callsTotals
            });
        default:
            return state;
    }
}