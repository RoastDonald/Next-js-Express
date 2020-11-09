import adminActionTypes from "./admin.types";
import API_CONTROLLER from "../../api/controller.api";
import { getUsersFailure, getUsersSuccess } from "./admin.actions";
import { takeLatest, call, all, put } from "redux-saga/effects";

export function* handleGetUsers() {
  try {
    const { data: users } = yield API_CONTROLLER.getUsers();
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield put(getUsersFailure(error));
  }
}

export function* onGetUsers() {
  yield takeLatest(adminActionTypes.USERS_GET_START, handleGetUsers);
}

export default function* adminSagas() {
  yield all([call(onGetUsers)]);
}
