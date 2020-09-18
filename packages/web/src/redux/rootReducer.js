import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userConfig = {
  key: "user",
  storage,
  blacklist: ["error"],
};

export default combineReducers({
  user: persistReducer(userConfig, userReducer),
});
