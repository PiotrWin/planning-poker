import * as actionTypes from './actionTypes';

export const addUser = user => ({
  type: actionTypes.DB_ADD_USER,
  user,
});

export const addSession = sessionName => ({
  type: actionTypes.DB_ADD_SESSION,
  sessionName,
});

export const getSessions = () => ({
  type: actionTypes.DB_GET_SESSIONS,
});

export const sessionsFetched = sessions => ({
  type: actionTypes.DB_SESSIONS_FETCHED,
  sessions,
});
