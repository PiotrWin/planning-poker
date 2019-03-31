import { put, select } from 'redux-saga/effects';
import { auth } from 'fbase/firebase';
import { getUserData } from 'utils/helpers';
import { setUser, initialized } from '../actions/auth';
import { initialAuthFinished } from '../selectors';

export function* signOutSaga() {
  yield auth.signOut();
}

export function* stateChangedSaga({ userId }) {
  const { currentUser } = auth;
  if (userId && userId === auth.currentUser.uid) {
    yield put(setUser(getUserData(currentUser)));
  }

  const isInitialized = yield select(initialAuthFinished);
  if (!isInitialized) {
    yield put(initialized());
  }
}
