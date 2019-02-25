import * as actionTypes from '../actions/actionTypes';

const initialState = {
  sessions: [],
  loading: true,
  initialFetchDone: false,
  userPath: '',
  currentSession: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SIGN_OUT: {
      return { ...initialState };
    }
    case actionTypes.DB_SET_USER_PATH: {
      return {
        ...state,
        userPath: action.path,
      };
    }
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
    case actionTypes.DB_JOINED_SESSION: {
      return {
        ...state,
        currentSession: action.id,
      };
    }
    default: return state;
  }
};

export default reducer;
