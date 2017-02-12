declare var PROJECT:string;
declare var VERSION:string;

declare var React: any;
declare var i18next: any;

interface NavigationItem{
    path?:string;
    name:any;
    src?:string;
    icon?:string;
    description?:string;
    to:string;
}