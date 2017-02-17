export const USER_DATA = 'USER_DATA';

interface userDataProps {
    name?:string;
}

export function userData(properties: userDataProps) {
    return { type: USER_DATA, data: properties };
}
