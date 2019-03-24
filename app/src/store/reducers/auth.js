import * as actionTypes from '../actions/actionTypes';

const initialState = {
  displayName: '',
  email: '',
  id: '',
  signedIn: false,
  initialAuthFinished: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SET_USER:
      return {
        ...state,
        ...action.user,
        signedIn: true,
      };
    case actionTypes.AUTH_SIGN_OUT:
      return {
        ...initialState,
      };
    case actionTypes.AUTH_INITIALIZED:
      return {
        ...state,
        initialAuthFinished: true,
      };
    default: return state;
  }
};

export default reducer;
