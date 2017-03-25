export interface IUser {
    id?:number;
    login?:string;
    permissions?:IUserPermissions;
}

export interface IUserPermissions {
    usersManage:boolean;
    groupsManage:boolean;
    telephonyManage:boolean;
    telephonyClients:string[]
}
