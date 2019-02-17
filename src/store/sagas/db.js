import { db } from 'fbase/firebase';

export function* addUser(user) {
  yield db.ref(`/users/${user.uid}`).set(user);
}

export const placeholder = () => {};
