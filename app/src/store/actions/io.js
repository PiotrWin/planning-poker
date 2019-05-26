import * as actionTypes from './actionTypes';

export const connect = () => ({
  type: actionTypes.IO_CONNECT,
});

export const connected = () => ({
  type: actionTypes.IO_CONNECTED,
});

