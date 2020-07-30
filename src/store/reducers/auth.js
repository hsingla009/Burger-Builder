import * as actionTypes from "../action/actionTypes";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.idToken,
        userId: action.userId,
      };

    case actionTypes.AUTH_FAILED:
      // console.log("reducer", action.error);
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
