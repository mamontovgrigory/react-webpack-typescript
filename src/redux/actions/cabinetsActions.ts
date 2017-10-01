import {ICabinet} from 'models/cabinets';
import {sendRequest} from './requestActions';

export const CABINETS: string = 'cabinets/CABINETS';

export function cabinets(cabinets: ICabinet[]) {
    return {
        type: CABINETS,
        cabinets
    };
}

export function getCabinets() {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Cabinets/GetList'
        })).then(function (result) {
            dispatch(cabinets(result));
        });
    });
}

export function getCabinetsClients(data: { id: string }, callback) {//TODO: escape using callback
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Clients/GetList',
            data
        })).then(function (result) {
            if(callback) callback(result);
            //dispatch(cabinets(result));
        });
    });
}

export function saveCabinet(data: ICabinet) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Cabinets/Save',
            data
        })).then(function () {
            dispatch(getCabinets());
        });
    });
}

export function deleteCabinets(data: { ids: string[] }) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/Api/Cabinets/Delete',
            data
        })).then(function () {
            dispatch(getCabinets());
        });
    });
}