import { put, select } from 'redux-saga/effects';
import { auth } from 'fbase/firebase';
import * as API from 'api/api';

import { setUser, initialized } from '../actions/auth';
import { getInitialAuthFinished } from '../selectors';

export function* signOutSaga() {
  yield auth.signOut();
}

export function* stateChangedSaga({ currentUser }) {
  if (!currentUser) {
    yield put(initialized());
    return;
  }

  const { id, gid } = yield API.authUser();
  if (gid && gid === currentUser.uid) {
    const {
      displayName,
      email,
    } = currentUser;

    yield put(setUser({
      displayName,
      email,
      id,
      gid,
    }));
  }

  const isInitialized = yield select(getInitialAuthFinished);
  if (!isInitialized) {
    yield put(initialized());
  }
}
