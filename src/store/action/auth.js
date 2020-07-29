import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const auth = (email, password) => {
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAZmB6Q3HpXJEht2RSpj0-Nppmb0wbqx60";
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZmB6Q3HpXJEht2RSpj0-Nppmb0wbqx60'

  return (dispatch) => {
    dispatch(authStart());
    Axios.post(url)
      .then((response) => {
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        dispatch(authFailed(err));
      });
  };
};
