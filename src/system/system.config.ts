var env = 'development';//NODE_ENV.trim();

system = {
    user: { //TODO: delete!
        login: 'test',
        isAdmin: true
    },
    serverUrl: (env === 'development' ? 'http://localhost' : window.location.origin) + '/ajax',
    routes: [
        {
            path: 'index',
            component: 'Main'
        },
        {
            path: 'telephony',
            component: 'Telephony'
        },
        {
            path: 'users',
            component: 'Users'
        }
    ],
    breadcrumbs: [
        {
            name: 'CRM',
            alias: 'index',
            href: '/'
        },
        {
            name: 'Личные кабинеты',
            alias: 'accounts',
            href: '/accounts',
            parents: [
                'index'
            ]
        },
        {
            name: 'Телефония',
            alias: 'telephony',
            href: '/telephony',
            parents: [
                'index'
            ]
        },
        {
            name: 'Пользователи',
            alias: 'users',
            href: '/users',
            parents: [
                'index'
            ]
        }
    ]
};