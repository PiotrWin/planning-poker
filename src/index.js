import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import App from 'components/App/App';
import registerServiceWorker from 'utils/registerServiceWorker';
import store from 'store/store';
import history from 'utils/history';
import theme from 'shared/theme';

import 'normalize.css';
import 'shared/styles/global.scss';

const app = (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
