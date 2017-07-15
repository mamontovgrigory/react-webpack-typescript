export interface IClient {
    id: string;
    login: string;
    alias?: string;
    checked?: boolean;
    numbers?: string;
}

export interface IClientGroup {
    name: string;
    ids: string[]
}

export interface ICallsTotals {
    dates: string[],
    data: {
        [clientName: string]: {
            count: number;
            objectiveCount: number;
        }[];
    }
}

export interface ICallDetails {
    id: string;
    callid: string;
    time: string;
    login: string;
    loginId: string;
    numfrom: string;
    numto: string;
    duration: string;
    mark?: string;
    model?: string;
    comment?: string;
    objective?: boolean;
}

export interface IUniqueComments {
    marks: string[];
    models: string[];
}