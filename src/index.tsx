import * as ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

console.log(PROJECT, VERSION);

i18next.init({
    lng: 'ru',
    resources: require('./i18n.json')
});

import './libs';
import './scss/app.scss';
import routes from './routes';
import configureStore from './redux/configureStore';

const initialState = {};
const store = configureStore(initialState);

const component = (
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes(store)}
        </Router>
    </Provider>
);

ReactDOM.render(component, document.getElementById('app'));