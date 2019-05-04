import { call, put, select } from 'redux-saga/effects';
import { getUserId } from 'store/selectors';
import {
  sessionsFetched,
} from 'store/actions/sessions';
import history from 'utils/history';

import * as API from 'api/api';

// export function* getSessions() {
//   const items = yield api.sessions.get();
//   yield put(actions.sessionsFetched(items));
// }

// export function* joinSession({ id }) {
//   const committed = yield api.session.join(id);

//   if (committed) {
//     yield put(actions.joinedSession(id));
//   }
// }

export function* addSession({ sessionName }) {
  const id = yield select(getUserId);
  const response = yield API.addSession(id, sessionName);
  // history.push(`/sessions/${id}`);
}

export function* getSessions() {
  const id = yield select(getUserId);
  const { data: sessions } = yield API.getUserSessions(id);

  yield put(sessionsFetched(sessions));
}

export function* removeSession({ sessionId }) {
  const userId = yield select(getUserId);
  yield API.removeSession(userId, sessionId);

  yield call(getSessions);
}
