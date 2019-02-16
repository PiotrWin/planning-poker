import * as actionTypes from '../actions/actionTypes';

const initialState = {
  displayName: '',
  email: '',
  uid: '',
  signedIn: false,
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
    default: return state;
  }
};

export default reducer;
