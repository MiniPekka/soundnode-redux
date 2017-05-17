/* eslint-disable */
import SC from 'soundcloud';
/* eslint-enable */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from 'client/app/store/configureStore';
import App from 'client/app/layout/App';
import 'isomorphic-fetch';
import 'rxjs';
import 'react-notifications/src/notifications.scss';
import 'normalize.css';
import 'client/app/styles/app.scss';

const store = configureStore();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
