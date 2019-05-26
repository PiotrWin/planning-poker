import { all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as authSagas from './auth';
import * as sessionsSagas from './sessions';
import * as ioSagas from './io';

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.AUTH_STATE_CHANGED, authSagas.stateChangedSaga),
    takeLatest(actionTypes.AUTH_SIGN_OUT, authSagas.signOutSaga),
  ]);
}

export function* watchSessions() {
  yield all([
    takeLatest(actionTypes.SESSIONS_ADD_SESSION, sessionsSagas.addSession),
    takeLatest(actionTypes.SESSIONS_REMOVE_SESSION, sessionsSagas.removeSession),
    takeLatest(actionTypes.SESSIONS_GET_SESSIONS, sessionsSagas.getSessions),
    // takeLatest(actionTypes.DB_JOIN_SESSION, dbSagas.joinSession),
  ]);
}

export function* watchIO() {
  yield all([
    takeLatest(actionTypes.IO_CONNECT, ioSagas.connect),
  ]);
}
