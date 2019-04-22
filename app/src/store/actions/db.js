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

export const sessionsFetched = (items) => {
  let sessions = [];
  console.log('in fetched, items: ', items);
  if (items) {
    sessions = Object.keys(items).map(key => ({
      id: key,
      ...items[key],
    }));
  }

  console.log('in fetched, sessions: ', sessions);
  return {
    type: actionTypes.DB_SESSIONS_FETCHED,
    sessions,
  };
};

export const joinSession = id => ({
  type: actionTypes.DB_JOIN_SESSION,
  id,
});

export const joinedSession = id => ({
  type: actionTypes.DB_JOINED_SESSION,
  id,
});

