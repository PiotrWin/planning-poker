import { put, select } from 'redux-saga/effects';
import * as actions from 'store/actions/db';
import { userId } from 'store/selectors';
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
  const uid = yield select(userId);
  const id = yield API.addSession(sessionName, uid);
  // history.push(`/sessions/${id}`);
}

export const test = 0;
