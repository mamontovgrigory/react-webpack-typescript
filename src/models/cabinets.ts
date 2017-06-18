export interface ICabinet {
    id: string;
    login: string;
    password: string;
    name?: string;
    clientsSettings?: {
        id: string;
        active: boolean;
        deleted: boolean;
    }[];
}