import { db } from 'fbase/firebase';
import { put, select } from 'redux-saga/effects';
import { userId } from 'store/selectors';
import * as actions from 'store/actions/db';

export function* addUser(user) {
  yield db.ref(`/users/${user.uid}`).set(user);
}

export function* addSession({ sessionName }) {
  const uid = yield select(userId);
  const ref = yield db.ref(`/users/${uid}/sessions`);
  yield ref.push({
    name: sessionName,
    created: Date.now(),
  });
}

export function* getSessions() {
  const uid = yield select(userId);
  const ref = yield db.ref(`/users/${uid}/sessions`);
  const response = yield ref.once('value');
  const items = yield response.val();
  const sessions = Object.keys(items).map(key => ({
    id: key,
    ...items[key],
  }));
  yield put(actions.sessionsFetched(sessions));
}
