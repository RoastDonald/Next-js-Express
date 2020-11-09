import Routes from "../routes.api";
import { VERBS, mapRouteToObject } from "../helper.api";

const methods = [
  {
    method: "postProduct",
    verb: VERBS["POST"],
    route: Routes.PRODUCTS,
    params: null,
    config: null,
  },
  {
    method: "uploadFile",
    verb: VERBS["POST"],
    route: Routes.UPLOAD_FILE,
    params: null,
    config: {
      header: {
        "content-type": "multipart/form-data",
      },
    },
  },
  {
    method: "deleteFile",
    verb: VERBS["POST"],
    route: Routes.DELETE_FILE,
    params: null,
    config: null,
  },
  {
    method: "getUsers",
    verb: VERBS["GET"],
    route: Routes.USERS,
    params: null,
    config: null,
  },
  {
    method: "deleteUser",
    verb: VERBS["DELETE"],
    route: Routes.USERS,
    params: null,
    config: null,
  },
];

export default () => mapRouteToObject(methods);
