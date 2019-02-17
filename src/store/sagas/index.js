import { all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as authSagas from './auth';
import * as dbSagas from './db';

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.AUTH_GET_CURRENT, authSagas.getCurrentUser),
    takeLatest(actionTypes.AUTH_STATE_CHANGED, authSagas.stateChangedSaga),
    takeLatest(actionTypes.AUTH_SIGN_IN, authSagas.signInSaga),
    takeLatest(actionTypes.AUTH_SIGN_OUT, authSagas.signOutSaga),
  ]);
}

export function* watchDb() {
  yield all([
    takeLatest(actionTypes.DB_ADD_USER, dbSagas.addUser),
  ]);
}
