import { put, select } from 'redux-saga/effects';
import { userId } from 'store/selectors';
import {
  sessionsFetched,
} from 'store/actions/db';
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
  const id = yield select(userId);
  const response = yield API.addSession(id, sessionName);
  console.log(response);
  // history.push(`/sessions/${id}`);
}

export function* getSessions() {
  const id = yield select(userId);
  const sessions = yield API.getUserSessions(id);

  console.log(sessions);
  yield put(sessionsFetched(sessions));
}
