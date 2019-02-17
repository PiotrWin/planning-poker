import { put } from 'redux-saga/effects';
import { auth, provider } from 'fbase/firebase';
import { getUserData } from 'utils/helpers';
import * as actions from '../actions/auth';

export function* getCurrentUser() {
  // TODO: implement
}

export function* signInSaga() {
  try {
    yield auth.signInWithPopup(provider);
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
}

