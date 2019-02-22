import { auth, db, provider } from './firebase';

export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export const set = (path, val) => db.ref(path).set(val);
export const get = async (path) => {
  const response = await db.ref(path).once('value');
  return response.val();
};
export const add = (path, item) => db.ref(path).push(item);
export const addListener = (path, callback, event = 'value') => {
  db.ref(path).on(event, callback);
};
export const removeListener = (path, callback, event = 'value') => {
  db.ref(path).off(event, callback);
};

export default {
  set,
  get,
  add,
  signIn,
  signOut,
  addListener,
  removeListener,
};

