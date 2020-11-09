import { all, call, put, takeLatest } from "redux-saga/effects";
import API_CONTROLLER from "../../api/controller.api";
import {
  brandFailure,
  brandSuccess,
  productFailure,
  productSuccess,
  woodFailure,
  woodSuccess,
} from "./shop.actions";
import shopActionTypes from "./shop.types";

function* handleProductRequest({ payload: filters }) {
  try {
    let _products = null;
    let _size = 0;
    if (filters) {
      const {
        data: products,
        size,
      } = yield API_CONTROLLER.getProductsByFilters(filters);
      _size = size;
      _products = [...(filters.products || []), ...products];
    } else {
      const {
        data: products,
        size,
      } = yield API_CONTROLLER.getProductsByBestSell();
      _products = products;
      _size = size;
    }
    yield put(productSuccess(_products, _size));
  } catch (error) {
    yield put(productFailure(error));
  }
}

function* handleWoodRequest() {
  try {
    const { data: woods } = yield API_CONTROLLER.getWoods();
    yield put(woodSuccess(woods));
  } catch (error) {
    yield put(woodFailure(error));
  }
}

function* handleBrandRequest() {
  try {
    const { data: brands } = yield API_CONTROLLER.getBrands();
    yield put(brandSuccess(brands));
  } catch (error) {
    yield put(brandFailure(error));
  }
}

function* onProductRequest() {
  yield takeLatest(shopActionTypes.PRODUCT_START, handleProductRequest);
}

function* onWoodRequest() {
  yield takeLatest(shopActionTypes.WOODS_START, handleWoodRequest);
}

function* onBrandRequest() {
  yield takeLatest(shopActionTypes.BRAND_START, handleBrandRequest);
}

export default function* productSagas() {
  yield all([
    call(onProductRequest),
    call(onWoodRequest),
    call(onBrandRequest),
  ]);
}
