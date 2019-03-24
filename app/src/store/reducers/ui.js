import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UI_LOADING_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.UI.UI_LOADING_FINISHED: {
      return {
        ...state,
        loading: false,
      };
    }
    default: return state;
  }
};

export default reducer;
