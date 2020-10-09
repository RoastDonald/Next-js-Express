import { all, call, put, takeLatest } from "redux-saga/effects";
import apiController from "../../api/apiController";
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
      const { data: products, size } = yield apiController.getProductsByFilters(
        filters
      );
      _size = size;
      _products = [...(filters.products || []), ...products];
    } else {
      const {
        data: products,
        size,
      } = yield apiController.getProductsByBestSell();
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
    const { data: woods } = yield apiController.getWoods();
    yield put(woodSuccess(woods));
  } catch (error) {
    yield put(woodFailure(error));
  }
}

function* handleBrandRequest() {
  try {
    const { data: brands } = yield apiController.getBrands();
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
