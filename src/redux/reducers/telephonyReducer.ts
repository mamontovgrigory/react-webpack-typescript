import * as moment from 'moment';

import {
    UPDATE_DATE_REQUEST_FINISHED,
    PERIOD,
    DURATION,
    CLIENTS_REQUEST_FINISHED,
    CALLS_TOTALS,
    CALLS_DETAILS
} from 'redux/actions/telephonyActions';

interface Client {
    id:string;
    login:string;
    checked?:boolean;
}

interface CallsTotals {
    dates:any[],
    data:any[]
}

interface State {
    from:string;
    to:string;
    duration?:number;
    updateDate:string;
    clients:Client[];
    callsTotals:CallsTotals;
    callsDetails:any[];
    groups:{
        name:string;
        ids:string[]
    }[]
}

interface Action {
    type:string;
    
    from:string;
    to:string;
    duration?:number;
    updateDate?:string;
    clients:Client[];
    callsTotals?:CallsTotals;
    callsDetails:any[];
}

const dateFormat = 'DD.MM.YYYY'; //TODO: Move to config
const initialState:State = {
    from: moment().add(-7, 'days').format(dateFormat),
    to: moment().format(dateFormat),
    updateDate: '',
    clients: [],
    callsTotals: {
        dates: [],
        data: []
    },
    callsDetails: [],
    groups: []
};

export default function (state:State = initialState, action:Action):State {
    switch (action.type) {
        case UPDATE_DATE_REQUEST_FINISHED:
            return _.assign({}, state, {
                updateDate: moment(action.updateDate).format('HH:mm:ss DD.MM.YYYY') //TODO: Move to config
            });
        case PERIOD:
            return _.assign({}, state, {
                from: action.from,
                to: action.to
            });
        case DURATION:
            return _.assign({}, state, {
                duration: action.duration
            });
        case CLIENTS_REQUEST_FINISHED:
            let officials = ['1', '20', '9', '60033', '11', '14', '15', '16', '19', '21', '91501']; //TODO: Move to new module
            return _.assign({}, state, {
                clients: action.clients,
                groups: [
                    {
                        name: i18next.t('official'),
                        ids: action.clients.filter((client) => {
                            return officials.indexOf(client.id) !== -1;
                        }).map((client) => {
                            return client.id;
                        })
                    },
                    {
                        name: i18next.t('unofficial'),
                        ids: action.clients.filter((client) => {
                            return officials.indexOf(client.id) === -1;
                        }).map((client) => {
                            return client.id;
                        })
                    }
                ]
            });
        case CALLS_TOTALS:
            return _.assign({}, state, {
                callsTotals: action.callsTotals
            });
        case CALLS_DETAILS:
            return _.assign({}, state, {
                callsDetails: action.callsDetails
            });
        default:
            return state;
    }
}