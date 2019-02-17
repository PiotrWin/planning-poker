import { put, fork, select } from 'redux-saga/effects';
import { auth, provider } from 'fbase/firebase';
import { getUserData } from 'utils/helpers';
import * as actions from '../actions/auth';
import { initialAuthFinished } from '../selectors';
import { addUser as addUserToDb } from './db';

export function* getCurrentUser() {
  // TODO: implement
}

export function* signInSaga() {
  try {
    const { additionalUserInfo, user } = yield auth.signInWithPopup(provider);
    if (additionalUserInfo.isNewUser) { // TODO: make it check for the user in db
      yield fork(addUserToDb, getUserData(user));
    }
  } catch (e) {
    // TODO: handle error
  }
}

export function* signOutSaga() {
  yield auth.signOut();
}

export function* stateChangedSaga({ user }) {
  if (user) {
    yield put(actions.setUser(getUserData(user)));
  }
  const initialized = yield select(initialAuthFinished);
  if (!initialized) {
    yield put(actions.initialized());
  }
}

