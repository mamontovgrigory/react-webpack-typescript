export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

interface logInProps{
    login:string;
    password:string;
}

export function logIn(properties:logInProps){
    return {type: LOG_IN, properties};
}

export function logOut(){
    return {type: LOG_OUT};
}