import alertActionTypes from "./alert.types";

const initialState = {
  open: false,
};

export default (prevState = initialState, action) => {
  console.log(228, action);
  switch (action.type) {
    case alertActionTypes.SHOW_ALERT:
      console.log("called");
      return {
        ...prevState,
        open: true,
        type: action.payload.type,
        message: action.payload.message,
        time: action.payload.time,
      };
    case alertActionTypes.HIDE_ALERT:
      return {
        ...prevState,
        open: false,
      };
    default:
      return prevState;
  }
};
