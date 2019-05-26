import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Application from 'components/App/App';
import registerServiceWorker from 'utils/registerServiceWorker';
import store from 'store/store';
import history from 'utils/history';

import 'normalize.css';
import 'shared/styles/global.scss';

const app = (
  <Provider store={store}>
    <Router history={history}>
      <Application />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
