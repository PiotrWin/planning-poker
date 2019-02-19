import * as actionTypes from './actionTypes';

export const addUser = user => ({
  type: actionTypes.DB_ADD_USER,
  user,
});

export const setUserPath = uid => ({
  type: actionTypes.DB_SET_USER_PATH,
  path: `/users/${uid}`,
});

export const addSession = (sessionName, history) => ({
  type: actionTypes.DB_ADD_SESSION,
  sessionName,
  history,
});

export const getSessions = () => ({
  type: actionTypes.DB_GET_SESSIONS,
});

export const sessionsFetched = sessions => ({
  type: actionTypes.DB_SESSIONS_FETCHED,
  sessions,
});
