import axios from "axios";
import Routes from "./routes.api";
import admin from "./subdirs/admin.subdir";
import user from "./subdirs/user.subdir";
import shop from "./subdirs/shop.subdir";

export const server = axios.create({
  baseURL: Routes.BASE_URL,
  timeout: 1000 * 20,
  withCredentials: true,
});

export default Object.assign(admin(), user(), shop());
