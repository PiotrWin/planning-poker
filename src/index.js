import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'normalize.css';
import App from 'components/App/App';
import registerServiceWorker from 'utils/registerServiceWorker';
import store from 'store/store';
import history from 'utils/history';

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
