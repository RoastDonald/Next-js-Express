import alertActionTypes from "./alert.types";

export const showAlert = (type = "success", message, time = 2000) => ({
  type: alertActionTypes.SHOW_ALERT,
  payload: {
    type,
    message,
    time,
  },
});

export const hideAlert = () => ({
  type: alertActionTypes.HIDE_ALERT,
});
