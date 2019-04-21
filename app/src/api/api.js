import axios from 'axios';
import { auth } from 'fbase/firebase';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
});

/* eslint-disable no-param-reassign */
instance.interceptors.request.use(async (config) => {
  const token = await auth.currentUser.getIdToken();

  config.headers.common = {
    ...config.headers.common,
    Authorization: `Bearer ${token}`,
  };

  return config;
}, Promise.reject);
/* eslint-enable no-param-reassign */

export const authUser = async () => {
  // TODO: handle error
  const response = await instance.post('/auth');
  return response.data.id;
};

export const addSession = async (name, uid) => {
  const response = await instance.post('/sessions', {
    uid,
    name,
  });

  console.log(response);
};
