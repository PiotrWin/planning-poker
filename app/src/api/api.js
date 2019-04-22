import axios from 'axios';
import { auth } from 'fbase/firebase';

const endpoint = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
});

/* eslint-disable no-param-reassign */
endpoint.interceptors.request.use(async (config) => {
  const token = await auth.currentUser.getIdToken();

  config.headers.common = {
    ...config.headers.common,
    Authorization: `Bearer ${token}`,
  };

  return config;
}, Promise.reject);
/* eslint-enable no-param-reassign */

export const authUser = async () => {
  const {
    data: {
      id,
      gid,
    },
  } = await endpoint.post('/auth');

  return {
    id,
    gid,
  };
};

export const addSession = (id, name) =>
  endpoint.post(`/user/${id}/sessions`, {
    id,
    name,
  });

export const getUserSessions = id => endpoint.get(`/user/${id}/sessions`);

