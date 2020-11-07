import adminActionTypes from './admin.types';
import apiController from "../../api/apiController";
import {getUsersFailure,getUsersSuccess} from './admin.actions';
import {takeLatest ,call,all,put} from 'redux-saga/effects';


export function* handleGetUsers(){
    try {
        const {data:users} = yield apiController.getUsers();
        yield put(getUsersSuccess(users));
    }catch(error){
        yield put(getUsersFailure(error));
    }
}

export function* onGetUsers() {
    yield takeLatest(adminActionTypes.USERS_GET_START,handleGetUsers)
}


export default function* adminSagas() {
    yield all([
        call(onGetUsers),
    ]);
}