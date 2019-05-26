import { put } from 'redux-saga/effects';

import { connected } from 'store/actions/io';

import io from 'sockets';

export function* connect() {
  console.log('connecting');
  yield io.connect();

  console.log(io.socket);
  yield put(connected());
}

export const test = null;
