import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './reducers';
import * as watchers from './sagas';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: reducers.authReducer,
  db: reducers.dbReducer,
});

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleWare)),
);

sagaMiddleWare.run(watchers.watchAuth);
sagaMiddleWare.run(watchers.watchDb);

export default store;
