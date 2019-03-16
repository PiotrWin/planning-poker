import { put, select } from 'redux-saga/effects';
import { auth } from 'fbase/firebase';
import { getUserData } from 'utils/helpers';
import { setUser, initialized } from '../actions/auth';
import { initialAuthFinished } from '../selectors';

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
