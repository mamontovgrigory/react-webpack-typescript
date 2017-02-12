import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import * as i18next from 'i18next';

import './libs';
import './scss/app.scss';
import routes from './routes';
import configureStore from './redux/configureStore';

i18next.init({
    lng: 'ru',
    resources: require('./i18n.json')
});

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