import store from 'store/store';
import { auth, db, provider } from './firebase';

const userPath = id => `/users/${id}`;
const sessionsPath = () => '/sessions';
const sessionPath = id => `${sessionsPath()}/${id}`;

export const signIn = () => auth.signInWithPopup(provider);

export const signOut = () => auth.signOut();

export const addUser = user =>
  db.ref(userPath(user.id)).set(user);

export const getSessions = async () => {
  const { uid } = store.getState().auth;
  const ref = await db.ref(`${userPath(uid)}/sessions`);
  const response = await ref.once('value');
  return response.val();
};

export const addSession = async (name) => {
  const { uid } = store.getState().auth;
  const data = {
    name,
    created: Date.now(),
  };
  const ref = await db.ref(`${userPath(uid)}/sessions`);
  const { key: id } = await ref.push(data);
  await db.ref(`sessions/${id}`).set(data);
  return id;
  // TODO: handle error
};

export const subscribeToSessions = async (callback) => {
  const { uid } = store.getState().auth;
  return db.ref(`${userPath(uid)}/sessions`).on('value', callback);
};

export const unsubscribeFromSessions = async (callback) => {
  const { uid } = store.getState().auth;
  return db.ref(`${userPath(uid)}/sessions`).off('value', callback);
};

export const getSession = async id =>
  db.ref(sessionPath(id)).once('value');

export const joinSession = async (id) => {
  const { uid } = store.getState().auth;
  const clientsRef = await db.ref((`${sessionPath(id)}/clients`));
  const { committed } = await clientsRef.transaction((users) => {
    if (!users) return { [uid]: true };
    return { ...users, [uid]: true };
  }, (error) => {
    if (error) {
      throw new Error(error.toString());
    }
  });

  if (committed) {
    clientsRef.onDisconnect().update({
      [uid]: false,
    });
  }
  return committed;
};

export const subscribeToSession = async (id, callback) =>
  db.ref(sessionPath(id)).on('value', callback);

export const unsubscribeFromSession = async (id, callback) =>
  db.ref(sessionPath(id)).off('value', callback);

export const leaveSession = async (id) => {
  const { uid } = store.getState().auth;
  await db.ref(`${sessionPath(id)}/clients`).update({
    [uid]: false,
  });
};

export const leaveSessionOnDisconnect = async (id) => {
  const { uid } = store.getState().auth;
  db.ref(`${sessionPath(id)}/clients`).onDisconnect().update({
    [uid]: false,
  });
};

export default {
  auth: {
    signIn,
    signOut,
    addUser,
  },
  sessions: {
    get: getSessions,
    subscribe: subscribeToSessions,
    unsubscribe: unsubscribeFromSessions,
  },
  session: {
    get: getSession,
    join: joinSession,
    leave: leaveSession,
    subscribe: subscribeToSession,
    unsubscribe: unsubscribeFromSession,
    add: addSession,
  },
};
