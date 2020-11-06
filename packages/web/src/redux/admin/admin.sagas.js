import adminActionTypes from './admin.types';
import apiController from "../../api/apiController";
import {getUsersFailure,getUsersSuccess} from './admin.actions';
import {takeLatest,call,all} from 'redux-saga/effects';


export function* handleGetUsers(){
    try {
        const {data:users} = apiController.getUsers();
        getUsersSuccess(users);
    }catch(error){
        yield getUsersFailure(error);
    }
}

export function* onGetUsers() {
    yield takeLatest(adminActionTypes.USERS_GET_START,handleGetUsers)
}


export default function* adminSagas() {
    return all([
        call(onGetUsers),
    ]);
}