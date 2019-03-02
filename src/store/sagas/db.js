import { db } from 'fbase/firebase';
import { put, select } from 'redux-saga/effects';
import { userPath } from 'store/selectors';
import * as actions from 'store/actions/db';
import history from 'utils/history';

import * as api from 'fbase/api';

export function* addUser(user) {
  yield db.ref(`/users/${user.uid}`).set(user);
}

export function* getSessions() {
  const items = yield api.getSessions();
  yield put(actions.sessionsFetched(items));
}

export function* joinSession({ id }) {
  const committed = yield api.joinSession(id);

  if (committed) {
    yield put(actions.joinedSession(id));
  }
}

export function* addSession({ sessionName }) {
  const path = yield select(userPath);
  try {
    const userRef = yield db.ref(`${path}/sessions`);
    const data = {
      name: sessionName,
      created: Date.now(),
    };
    const { key } = yield userRef.push({ ...data });
    yield db.ref(`/sessions/${key}`).set({ ...data });
    history.push(`/sessions/${key}`);
  } catch (e) {
    // TODO: handle error
  }
}
