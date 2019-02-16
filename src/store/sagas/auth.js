import { put } from 'redux-saga/effects';
import { auth, provider } from 'fbase/firebase';
import { getUserData } from 'utils/helpers';
import * as actions from '../actions/auth';

export function* getCurrentUser() {
  yield console.log(auth.currentUser);
}

export function* signInSaga() {
  try {
    yield auth.signInWithPopup(provider);
  } catch (e) {
    console.log('something went wrong', e);
  }
}

export function* signOutSaga() {
  yield console.log('sign out', auth.currentUser);
  yield auth.signOut();
  console.log(auth.currentUser);
}

export function* stateChangedSaga({ user }) {
  if (user) {
    yield put(actions.setUser(getUserData(user)));
  }
}

