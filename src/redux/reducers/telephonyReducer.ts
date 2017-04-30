import * as moment from 'moment';

import {IClient, IClientGroup, ICallsTotals, ICallDetails, IUniqueComments} from 'models/telephony';

import {
    UPDATE_DATE_REQUEST_FINISHED,
    PERIOD,
    DURATION,
    CLIENTS_REQUEST_FINISHED,
    CALLS_TOTALS,
    CALLS_DETAILS,
    UNIQUE_COMMENTS
} from 'redux/actions/telephonyActions';

interface State {
    from:string;
    to:string;
    duration?:number;
    updateDate:string;
    clients:IClient[];
    callsTotals:ICallsTotals;
    callsDetails:any[];
    groups:IClientGroup[];
    uniqueComments:IUniqueComments
}

interface Action {
    type:string;

    from?:string;
    to?:string;
    duration?:number;
    updateDate?:string;
    clients?:IClient[];
    callsTotals?:any;
    callsDetails?:ICallDetails[];
    uniqueComments?:IUniqueComments;
}

const dateFormat = 'DD.MM.YYYY'; //TODO: Move to config
const initialState:State = {
    from: moment().add(-7, 'days').format(dateFormat),
    to: moment().format(dateFormat),
    updateDate: '',
    clients: [],
    callsTotals: {
        dates: [],
        data: {}
    },
    callsDetails: [],
    groups: [],
    uniqueComments: {
        marks: [],
        models: []
    }
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
            let officials = ['1', '20', '9', '60033', '11', '14', '15', '16', '19', '21', '91501', '394139', '403796']; //TODO: Move to new module
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
        case UNIQUE_COMMENTS:
            return _.assign({}, state, {
                uniqueComments: action.uniqueComments
            });
        default:
            return state;
    }
}