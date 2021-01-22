import userActionTypes from "./user.types";

const INTIAL_STATE = {
  currentUser: null,
  error: null,
};

export default (prevState = INTIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.USER_ACCOUNT_UPDATE_SUCCESS:
      return {
        ...prevState,
        currentUser: action.payload,
      };
    case userActionTypes.USER_ACCOUNT_UPDATE_FAILURE:
      return {
        ...prevState,
        error: action.payload,
      };

    case userActionTypes.CLEAR_ERROR:
      return {
        ...prevState,
        error: null,
      };
    case userActionTypes.USER_LOGIN_SUCCESS:
    case userActionTypes.USER_REGISTER_SUCCESS:
    case userActionTypes.USER_ME_SUCCESS:
    case userActionTypes.USER_AUTH_GOOGLE_SUCCESS:
      return {
        ...prevState,
        currentUser: action.payload,
      };
    case userActionTypes.USER_LOGIN_FAILURE:
    case userActionTypes.USER_REGISTER_FAILURE:
    case userActionTypes.USER_LOGOUT_FAILURE:
    case userActionTypes.USER_ME_FAILURE:
    case userActionTypes.USER_AUTH_GOOGLE_FAILURE:
      return {
        ...prevState,
        error: action.payload,
        currentUser: null,
      };
    case userActionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...prevState,
        currentUser: null,
        error: null,
      };
    default:
      return prevState;
  }
};
