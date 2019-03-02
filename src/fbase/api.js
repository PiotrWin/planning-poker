import store from 'store/store';
import { auth, db, provider } from './firebase';

const userPath = id => `/users/${id}`;
const sessionsPath = () => '/sessions';
const sessionPath = id => `${sessionsPath()}/${id}`;

export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const getSessions = async () => {
  const { uid } = store.getState().auth;
  const ref = await db.ref(`${userPath(uid)}/sessions`);
  const response = await ref.once('value');
  return response.val();
};

// export const getSession = async (id) => {

// }

export const joinSession = async (id) => {
  const { uid } = store.getState().auth;
  const clientsRef = await db.ref((`${sessionPath(id)}/clients`));
  const { committed } = await clientsRef.transaction((currentUsers) => {
    if (!currentUsers) return { [uid]: true };
    return { ...currentUsers, [uid]: true };
  }, (error) => {
    if (error) {
      throw new Error(error.toString());
    }
  });

  return committed;
};

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
