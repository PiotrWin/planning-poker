import { put, fork, select } from 'redux-saga/effects';
import { auth, provider } from 'fbase/firebase';
import { getUserData } from 'utils/helpers';
import { setUser, initialized } from '../actions/auth';
import { initialAuthFinished } from '../selectors';
import { addUser } from './db';

export function* getCurrentUser() {
  // TODO: implement
}

export function* signInSaga() {
  try {
    const { additionalUserInfo, user } = yield auth.signInWithPopup(provider);
    if (additionalUserInfo.isNewUser) { // TODO: make it check for the user in db
      yield fork(addUser, getUserData(user));
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
    const userData = getUserData(user);
    yield put(setUser(userData));
  }
  const isInitialized = yield select(initialAuthFinished);
  if (!isInitialized) {
    yield put(initialized());
  }
}

