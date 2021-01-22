import userActionTypes from "./user.types";
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  logoutSuccess,
  logoutFailure,
  userMeSuccess,
  userMeFailure,
  updateUserAccountSuccess,
  updateUserAccountFailure,
  authGoogleFailure,
  authGoogleSuccess,
} from "./user.actions";
import { showAlert, hideAlert } from "../alert/alert.actions";
import { takeLatest, call, put, all } from "redux-saga/effects";
import API_CONTROLLER from "../../api/controller.api";

function* handleLogin({ payload: userCredentials }) {
  try {
    const { data: user } = yield API_CONTROLLER.login(userCredentials);
    yield put(loginSuccess(user));
    // history.push("/my-account");
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* handleRegister({ payload: userCredentials }) {
  try {
    const { data: user } = yield API_CONTROLLER.register(userCredentials);
    yield put(registerSuccess(user));
    // history.push("/my-account");
  } catch (error) {
    yield put(registerFailure(error));
  }
}

function* handleLogout() {
  try {
    yield API_CONTROLLER.logout();
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* handleUserMe() {
  try {
    const { data: user } = yield API_CONTROLLER.me();
    yield put(userMeSuccess(user));
  } catch (error) {
    yield put(userMeFailure(error));
  }
}

function* handleAccountUpdate({ payload: userProps }) {
  try {
    const { data: user } = yield API_CONTROLLER.updateCurrentAccount(userProps);
    yield all([
      put(updateUserAccountSuccess(user)),
      put(showAlert("success", "Your details were successfuly updated")),
    ]);
  } catch (error) {
    yield all([
      put(updateUserAccountFailure(error)),
      put(showAlert("error", "Something went wrong, try later")),
    ]);
  }
}

function* handleGoogleAuth({ payload: googleData }) {
  try {
    const { data: user } = yield API_CONTROLLER.loginWithGoogle({
      token: googleData.tokenId,
    });
    yield put(authGoogleSuccess(user));
  } catch (error) {
    yield put(authGoogleFailure(error));
  }
}

function* onUserMeStart() {
  yield takeLatest(userActionTypes.USER_ME_START, handleUserMe);
}
function* onUserAccountUpdate() {
  yield takeLatest(
    userActionTypes.USER_ACCOUNT_UPDATE_START,
    handleAccountUpdate
  );
}
function* onUserLoginStart() {
  yield takeLatest(userActionTypes.USER_LOGIN_START, handleLogin);
}

function* onUserGoogleAuth() {
  yield takeLatest(userActionTypes.USER_AUTH_GOOGLE_START, handleGoogleAuth);
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
    call(onUserAccountUpdate),
    call(onUserGoogleAuth),
  ]);
}
