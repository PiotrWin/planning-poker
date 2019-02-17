import * as actionTypes from '../actions/actionTypes';

const initialState = {
  sessions: [],
  loading: true,
  initialFetchDone: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DB_GET_SESSIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.DB_SESSIONS_FETCHED: {
      return {
        ...state,
        sessions: action.sessions,
        loading: false,
        initialFetchDone: state.initialFetchDone || true,
      };
    }
    default: return state;
  }
};

export default reducer;
