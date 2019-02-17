import * as actionTypes from './actionTypes';

export const addUser = user => ({
  type: actionTypes.DB_ADD_USER,
  user,
});

export const placeholder = () => {};
