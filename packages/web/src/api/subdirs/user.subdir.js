import Routes from "../routes.api";
import { VERBS, mapRouteToObject } from "../helper.api";

const methods = [
  {
    method: "login",
    verb: VERBS["POST"],
    route: Routes.LOGIN,
    params: null,
    config: null,
  },
  {
    method: "logout",
    verb: VERBS["GET"],
    route: Routes.LOGOUT,
    params: null,
    config: null,
  },
  {
    method: "register",
    verb: VERBS["POST"],
    route: Routes.REGISRER,
    params: null,
    config: null,
  },
  {
    method: "me",
    verb: VERBS["GET"],
    route: Routes.ME,
    params: null,
    config: null,
  },
];

export default () => mapRouteToObject(methods);
