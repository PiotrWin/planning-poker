import axios from 'axios';
import { auth } from 'fbase/firebase';

export const instance = axios.create({
  baseUrl: 'http://localhost:4000',
  timeout: 5000,
});

export const authUser = async () => {
  const token = await auth.currentUser.getIdToken();
  const response = await axios.post('http://localhost:4000/auth', { token });

  console.log(response);
};
