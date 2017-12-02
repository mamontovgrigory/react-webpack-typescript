export interface IUser {
    id?: number;
    login?: string;
    permissions?: IUserPermissions;
}

export interface IUserPermissions {
    usersManage: boolean;
    groupsManage: boolean;
    stockManage: boolean;
    telephonyCabinetsManage: boolean;
    telephonyCommentsManage: boolean;
    telephonyCommentsView: boolean;
    telephonyClients: string[]
}
