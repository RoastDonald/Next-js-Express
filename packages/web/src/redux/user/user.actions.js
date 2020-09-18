import userActionTypes from "./user.types";

export const loginStart = (userCredentials) => ({
  type: userActionTypes.USER_LOGIN_START,
  payload: userCredentials,
});
export const loginSuccess = (userInfo) => ({
  type: userActionTypes.USER_LOGIN_SUCCESS,
  payload: userInfo,
});

export const loginFailure = (error) => ({
  type: userActionTypes.USER_LOGIN_FAILURE,
  payload: error,
});

export const registerStart = (userCredentials) => ({
  type: userActionTypes.USER_REGISTER_START,
  payload: userCredentials,
});
export const registerSuccess = (userInfo) => ({
  type: userActionTypes.USER_REGISTER_SUCCESS,
  payload: userInfo,
});

export const registerFailure = (error) => ({
  type: userActionTypes.USER_REGISTER_FAILURE,
  payload: error,
});

export const logoutStart = () => ({
  type: userActionTypes.USER_LOGOUT_START,
});

export const logoutSuccess = () => ({
  type: userActionTypes.USER_LOGOUT_SUCCESS,
});

export const logoutFailure = () => ({
  type: userActionTypes.USER_LOGOUT_FAILURE,
});

export const userMeStart = () => ({
  type: userActionTypes.USER_ME_START,
});

export const userMeSuccess = (userInfo) => ({
  type: userActionTypes.USER_ME_SUCCESS,
  payload: userInfo,
});

export const userMeFailure = (error) => ({
  type: userActionTypes.USER_ME_FAILURE,
  payload: error,
});
