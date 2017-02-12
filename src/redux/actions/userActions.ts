export const USER_DATA = 'USER_DATA';

interface stateProps {
    name?:string;
}

export function userData(properties: stateProps) {
    return { type: USER_DATA, data: properties };
}
