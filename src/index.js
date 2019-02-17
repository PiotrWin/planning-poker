import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import 'normalize.css';
import App from 'components/App/App';
import registerServiceWorker from 'utils/registerServiceWorker';
import authReducer from 'store/reducers/auth';
import dbReducer from 'store/reducers/db';
import { watchAuth, watchDb } from './store/sagas';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  db: dbReducer,
});

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleWare)),
);

sagaMiddleWare.run(watchAuth);
sagaMiddleWare.run(watchDb);

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
