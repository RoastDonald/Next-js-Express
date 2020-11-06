import adminActionTypes from './admin.types';


export const getUsersStart = ()=>({
    type:adminActionTypes.USERS_GET_START,
});

export const getUsersSuccess = (users)=>({
    type:adminActionTypes.USERS_GET_SUCCESS,
    payload:users
});

export const getUsersFailure = (error)=>({
    type:adminActionTypes.USERS_GET_FAILURE,
    payload:error
});
