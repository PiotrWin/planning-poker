import * as actionTypes from './actionTypes';

export const addUser = user => ({
  type: actionTypes.SESSIONS_ADD_USER,
  user,
});

export const setUserPath = uid => ({
  type: actionTypes.SESSIONS_SET_USER_PATH,
  path: `/users/${uid}`,
});

export const addSession = (sessionName, history) => ({
  type: actionTypes.SESSIONS_ADD_SESSION,
  sessionName,
  history,
});

export const getSessions = () => ({
  type: actionTypes.SESSIONS_GET_SESSIONS,
});

export const removeSession = sessionId => ({
  type: actionTypes.SESSIONS_REMOVE_SESSION,
  sessionId,
});

export const sessionsFetched = sessions => ({
  type: actionTypes.SESSIONS_SESSIONS_FETCHED,
  sessions,
});

export const joinSession = id => ({
  type: actionTypes.SESSIONS_JOIN_SESSION,
  id,
});

export const joinedSession = id => ({
  type: actionTypes.SESSIONS_JOINED_SESSION,
  id,
});

