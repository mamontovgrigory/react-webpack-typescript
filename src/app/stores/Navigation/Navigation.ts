import * as _ from 'lodash';

interface Item{
    name: string,
    icon: string,
    to: string,
    src: string,
    description: string,
    roles: string[]
}

class Navigation{
    getItems(callback : Function){
        var items = [
            {
                name: 'Пользователи',
                icon: 'recent_actors',
                to: 'users',
                src: require('./content/users.png'),
                description: 'Создание, редактирование и удаление пользователей системы',
                roles: [ 'admin' ]
            },
            {
                name: 'Телефония',
                icon: 'phone',
                to: 'telephony',
                src: require('./content/telephony.png'),
                description: 'Просмотр статистики и прослушивание записей телефонии',
                roles: [ 'admin', 'user' ]
            }
        ];

        items = _.filter(items, function(i){
            var valid = false;
            if(system.user){
                valid = _.indexOf(i.roles, system.user.isAdmin ? 'admin' : 'user') !== -1;
            }
            return valid;
        });

        callback(items);
    }
}

export default new Navigation;
