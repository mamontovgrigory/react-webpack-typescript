export interface IUser {
    id?:number;
    login?:string;
    permissions?:IUserPermissions;
}

export interface IUserPermissions {
    usersManage:boolean;
    groupsManage:boolean;
    telephonyCommentsManage:boolean;
    telephonyCommentsView:boolean;
    telephonyClients:string[]
}
