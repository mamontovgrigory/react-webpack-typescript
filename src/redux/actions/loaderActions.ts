export const SHOW_LOADER = 'loader/SHOW_LOADER';
export const HIDE_LOADER = 'loader/HIDE_LOADER';

export function showLoader() {
    return {type: SHOW_LOADER};
}

export function hideLoader() {
    return {type: HIDE_LOADER};
}