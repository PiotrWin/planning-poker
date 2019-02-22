import { auth, db, provider } from './firebase';

export const signIn = () => auth.signInWithPopup(provider);

export const signOut = () => auth.signOut();

export const set = (path, val) => db.ref(path).set(val);

export const get = async (path) => {
  const ref = await db.ref(path);
  const response = await ref.once('value');
  return response.val();
};

export default {
  signIn,
  signOut,
  set,
  get,
};

