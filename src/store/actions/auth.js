import * as actionTypes from './actionTypes';

export const getCurrentUser = () => ({
  type: actionTypes.AUTH_GET_CURRENT,
});

export const setUser = user => ({
  type: actionTypes.AUTH_SET_USER,
  user,
});

export const userStateChanged = user => ({
  type: actionTypes.AUTH_STATE_CHANGED,
  user,
});

export const signIn = () => ({
  type: actionTypes.AUTH_SIGN_IN,
});

export const signOut = () => ({
  type: actionTypes.AUTH_SIGN_OUT,
});
