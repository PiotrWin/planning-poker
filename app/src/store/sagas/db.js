import { put } from 'redux-saga/effects';
import * as actions from 'store/actions/db';
import history from 'utils/history';

import api from 'fbase/api';

export function* getSessions() {
  const items = yield api.sessions.get();
  yield put(actions.sessionsFetched(items));
}

export function* joinSession({ id }) {
  const committed = yield api.session.join(id);

  if (committed) {
    yield put(actions.joinedSession(id));
  }
}

export function* addSession({ sessionName }) {
  const id = yield api.session.add(sessionName);
  history.push(`/sessions/${id}`);
}
