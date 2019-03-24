import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDVgFng-KnaQQ8-k_N6TSNUARgGu8z2mKA',
  authDomain: 'planning-poker-1d012.firebaseapp.com',
  databaseURL: 'https://planning-poker-1d012.firebaseio.com',
  projectId: 'planning-poker-1d012',
  storageBucket: 'planning-poker-1d012.appspot.com',
  messagingSenderId: '663077595011',
};

(async () => {
  await firebase.initializeApp(config);
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
})();

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
