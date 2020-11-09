import Routes from "../routes.api";
import { VERBS, mapRouteToObject } from "../helper.api";

const methods = [
  {
    method: "getProductsByBestSell",
    verb: VERBS["GET"],
    route: Routes.PRODUCTS,
    params: {
      sortBy: "sold",
      order: "desc",
      limit: 4,
    },
    config: null,
  },
  {
    method: "getProductsByFilters",
    verb: VERBS["POST"],
    route: Routes.SHOP,
    params: null,
    config: null,
  },
  {
    method: "getWoods",
    verb: VERBS["GET"],
    route: Routes.WOODS,
    params: null,
    config: null,
  },
  {
    method: "getBrands",
    verb: VERBS["GET"],
    route: Routes.BRANDS,
    params: null,
    config: null,
  },
];

export default () => mapRouteToObject(methods);
