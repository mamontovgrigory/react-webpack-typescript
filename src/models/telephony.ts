export interface IClient {
    id:string;
    login:string;
    checked?:boolean;
}

export interface ICallsTotals {
    dates:string[],
    data:{[clientName:string]:number; }[]
}

export interface ICallDetails {
    id:string;
    callid:string;
    time:string;
    numfrom:string;
    numto:string;
    duration:string;
    mark?:string;
    model?:string;
    comment?:string;
    objective?:boolean;
}