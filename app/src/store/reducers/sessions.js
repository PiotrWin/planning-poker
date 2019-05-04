import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ownSessions: [],
  visitedSessions: [],
  loading: true,
  initialFetchDone: false,
  currentSession: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SIGN_OUT: {
      return { ...initialState };
    }
    case actionTypes.SESSIONS_GET_SESSIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.SESSIONS_SESSIONS_FETCHED: {
      const {
        sessions: {
          ownSessions,
          visitedSessions,
        },
      } = action;

      return {
        ...state,
        ownSessions,
        visitedSessions,
        loading: false,
        initialFetchDone: state.initialFetchDone || true,
      };
    }
    case actionTypes.SESSIONS_JOINED_SESSION: {
      return {
        ...state,
        currentSession: action.id,
      };
    }
    default: return state;
  }
};

export default reducer;
