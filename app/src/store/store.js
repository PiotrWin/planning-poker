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
  sessions: reducers.sessionsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

for (const key in watchers) {
  sagaMiddleware.run(watchers[key]);
}

export default store;
