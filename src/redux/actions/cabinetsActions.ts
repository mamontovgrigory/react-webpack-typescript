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
            url: '/ajax/get_list_cabinets.php'
        })).then(function (result) {
            dispatch(cabinets(result));
        });
    });
}

export function getCabinetsClients(data: { id: string }, callback) {//TODO: escape using callback
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/get_list_cabinets_users.php',
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
            url: '/ajax/cabinet_save.php',
            data
        })).then(function () {
            dispatch(getCabinets());
        });
    });
}

export function deleteCabinets(data: { ids: string[] }) {
    return (dispatch => {
        dispatch(sendRequest({
            url: '/ajax/cabinets_delete.php',
            data
        })).then(function () {
            dispatch(getCabinets());
        });
    });
}