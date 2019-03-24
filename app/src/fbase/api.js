import store from 'store/store';
import { auth, db, provider } from './firebase';

export const signIn = () => auth.signInWithPopup(provider);

export const signOut = () => auth.signOut();

// export const addSession = async (name) => {
//   const { uid } = store.getState().auth;
//   const data = {
//     name,
//     created: Date.now(),
//     createdBy: uid,
//   };
//   const ref = await db.ref(`${userPath(uid)}/sessions`);
//   const { key: id } = await ref.push(data);
//   await db.ref(`sessions/${id}`).set(data);
//   return id;
//   // TODO: handle error
// };

// export const storeSession = async (id) => {
//   const { uid } = store.getState().auth;
//   const session = await db.ref(`${sessionPath(id)}`).once('value');
//   const { name, created, createdBy } = await session.val();

//   await db.ref(`${userPath(uid)}/sessions/${id}`).set({
//     name,
//     created,
//     createdBy,
//   });
// };

// export const subscribeToSessions = async (callback) => {
//   const { uid } = store.getState().auth;
//   return db.ref(`${userPath(uid)}/sessions`).on('value', callback);
// };

// export const unsubscribeFromSessions = async (callback) => {
//   const { uid } = store.getState().auth;
//   return db.ref(`${userPath(uid)}/sessions`).off('value', callback);
// };

// export const getSession = async id =>
//   db.ref(sessionPath(id)).once('value');

// export const joinSession = async (id) => {
//   const { uid } = store.getState().auth;
//   const clientsRef = await db.ref(`${sessionPath(id)}/clients`);
//   const { committed } = await clientsRef.transaction((users) => {
//     if (!users) return { [uid]: true };
//     return { ...users, [uid]: true };
//   }, (error) => {
//     if (error) {
//       throw new Error(error.toString());
//     }
//   });

//   if (committed) {
//     clientsRef.onDisconnect().update({
//       [uid]: false,
//     });

//     const sessions = await db.ref(`${userPath(uid)}/sessions`).once('value');
//     const sessionsData = await sessions.val();
//     if (!Object.keys(sessionsData).includes(id)) {
//       storeSession(id);
//     }
//   }
//   return committed;
// };

// export const subscribeToSession = async (id, callback) =>
//   db.ref(sessionPath(id)).on('value', callback);

// export const unsubscribeFromSession = async (id, callback) =>
//   db.ref(sessionPath(id)).off('value', callback);

// export const leaveSession = async (id) => {
//   const { uid } = store.getState().auth;

//   await db.ref(`${sessionPath(id)}`).transaction((session) => {
//     if (session === null) {
//       return null;
//     }
//     return {
//       ...session,
//       clients: {
//         ...session.clients,
//         [uid]: false,
//       },
//     };
//   }, (error) => {
//     if (error) {
//       throw new Error(error.toString());
//     }
//   }, true);
// };

// export const leaveSessionOnDisconnect = async (id) => {
//   const { uid } = store.getState().auth;
//   db.ref(`${sessionPath(id)}/clients`).onDisconnect().update({
//     [uid]: false,
//   });
// };

// export const removeSession = async (id) => {
//   const { uid } = store.getState().auth;
//   await db.ref(`${userPath(uid)}/sessions/${id}`).remove();
// };

// export default {
//   auth: {
//     signIn,
//     signOut,
//     addUser,
//   },
//   sessions: {
//     get: getSessions,
//     subscribe: subscribeToSessions,
//     unsubscribe: unsubscribeFromSessions,
//   },
//   session: {
//     get: getSession,
//     join: joinSession,
//     leave: leaveSession,
//     subscribe: subscribeToSession,
//     unsubscribe: unsubscribeFromSession,
//     add: addSession,
//     remove: removeSession,
//   },
// };
