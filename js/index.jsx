import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import routes from './routes';

import '../css/reset'
import '../css/common'
import '../css/antd'

let store = configureStore();
let rootElement = document.getElementById('app');

render(
    <div className="app">
        <Provider store={store}>
            {routes}
        </Provider>
    </div>,
    rootElement
);