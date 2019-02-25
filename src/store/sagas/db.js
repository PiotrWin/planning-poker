import { db } from 'fbase/firebase';
import { put, select } from 'redux-saga/effects';
import { userPath, userId } from 'store/selectors';
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

export function* joinSession({ id }) {
  const uid = yield select(userId);
  const clientsRef = yield db.ref((`/sessions/${id}/clients`));
  const { committed } = yield clientsRef.transaction((currentUsers) => {
    if (!currentUsers) return { [uid]: true };
    return { ...currentUsers, [uid]: true };
  }, (error) => {
    if (error) {
      throw new Error(error.toString());
    }
  });

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
