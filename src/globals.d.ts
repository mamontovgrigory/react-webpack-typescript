interface systemProps {
    user?: {
        login?: string,
        isAdmin?: boolean
    },
    serverUrl?: string
    routes?: {
        path: string,
        component: any
    }[],
    breadcrumbs?: {
        name: string,
        alias: string,
        href: string,
        parents?: string[]
    }[]
}

declare function require(string: string): string;
declare var system: systemProps;