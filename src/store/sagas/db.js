import { db } from 'fbase/firebase';
import { put, select } from 'redux-saga/effects';
import { userPath } from 'store/selectors';
import * as actions from 'store/actions/db';
import history from 'utils/history';

export function* addUser(user) {
  yield db.ref(`/users/${user.uid}`).set(user);
}

export function* getSessions() {
  const path = yield select(userPath);
  const ref = yield db.ref(`${path}/sessions`);
  const response = yield ref.once('value');
  const items = yield response.val();
  yield put(actions.sessionsFetched(items));
}

export function* addSession({ sessionName }) {
  const path = yield select(userPath);
  try {
    const ref = yield db.ref(`${path}/sessions`);
    const { key } = yield ref.push({
      name: sessionName,
      created: Date.now(),
    });
    history.push(`/my-sessions/${key}`);
  } catch (e) {
    // TODO: handle error
  }
}
