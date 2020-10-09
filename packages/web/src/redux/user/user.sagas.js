import userActionTypes from "./user.types";
import history from "../../history";
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  logoutSuccess,
  logoutFailure,
  userMeSuccess,
  userMeFailure,
} from "./user.actions";
import {
  takeLatest,
  call,
  put,
  all
} from "redux-saga/effects";
import apiController from "../../api/apiController";

function* handleLogin({
  payload: userCredentials
}) {
  try {
    const {
      data: user
    } = yield apiController.login(userCredentials);
    yield put(loginSuccess(user));
    history.push("/user/dashboard");
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* handleRegister({
  payload: userCredentials
}) {
  try {
    const {
      data: user
    } = yield apiController.register(userCredentials);
    yield put(registerSuccess(user));
    history.push("/user/dashboard");
  } catch (error) {
    yield put(registerFailure(error));
  }
}

function* handleLogout() {
  try {
    yield apiController.logout();
    yield put(logoutSuccess());
    history.push("/login");
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* handleUserMe() {
  try {
    const {
      data: user
    } = yield apiController.me();
    yield put(userMeSuccess(user));
  } catch (error) {
    yield put(userMeFailure(error));
  }
}

function* onUserMeStart() {
  yield takeLatest(userActionTypes.USER_ME_START, handleUserMe);
}

function* onUserLoginStart() {
  yield takeLatest(userActionTypes.USER_LOGIN_START, handleLogin);
}

function* onUserRegisterStart() {
  yield takeLatest(userActionTypes.USER_REGISTER_START, handleRegister);
}

function* onUserLogoutStart() {
  yield takeLatest(userActionTypes.USER_LOGOUT_START, handleLogout);
}

export default function* userSagas() {
  yield all([
    call(onUserLoginStart),
    call(onUserRegisterStart),
    call(onUserLogoutStart),
    call(onUserMeStart),
  ]);
}