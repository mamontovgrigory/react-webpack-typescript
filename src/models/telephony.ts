export interface IClient {
    id:string;
    login:string;
    checked?:boolean;
}

export interface IClientGroup{
    name:string;
    ids:string[]
}

export interface ICallsTotals {
    dates:string[],
    data:{[clientName:string]:string[]; }
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

export interface IUniqueComments {
    marks:string[];
    models:string[];
}