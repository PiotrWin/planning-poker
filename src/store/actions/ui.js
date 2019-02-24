import * as actionTypes from './actionTypes';

export const loadingStarted = () => ({
  type: actionTypes.UI_LOADING_STARTED,
});

export const loadingFinished = () => ({
  type: actionTypes.UI_LOADING_FINISHED,
});
