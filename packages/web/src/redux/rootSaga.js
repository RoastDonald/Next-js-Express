import {
  all,
  call
} from "redux-saga/effects";

import userSagas from "./user/user.sagas";
import productSagas from "./shop/shop.sagas";
import adminSagas from './admin/admin.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(productSagas),call(adminSagas)]);
}