import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as apiKey from "../../ApiKeys"
export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    idToken: idToken,
  };
};

export const authFailed = (error) => {
  console.log("AUTH_FAILED", error);
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
export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const checkTimeOut = (expirationTime) => {
  // console.log(expirationTime);
  return (dispatch) => {
    setTimeout(() => {
      // console.log("logging out");
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};
export const auth = (email, password, isSignup) => {
  let url = apiKey.LOGIN;
  if (isSignup) url = apiKey.SIGNUP;
  return (dispatch) => {
    // console.log(email,password);
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    dispatch(authStart());
    axios
      .post(url, authData)
      .then((response) => {
        // console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        // console.log(response.data.expiresIn,new Date().getTime())
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
        // console.log(expirationDate.getTime());
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkTimeOut(response.data.expiresIn));
      })
      .catch((err) => {
        // console.log(err.response.data);
        dispatch(authFailed(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
