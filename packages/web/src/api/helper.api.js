import { server } from "./controller.api";

export const VERBS = {
  POST: "post",
  GET: "get",
  DELETE: "delete",
  PATCH: "patch",
  PUT: "put",
};

export const mapRouteToObject = (methods) => {
  return methods.reduce((router, { route, verb, method, config, params }) => {
    if (params) route = route.concat("?", new URLSearchParams(params));
    return {
      ...router,
      [method]: (data = null) => handleRequest(route, verb, data, config),
    };
  }, {});
};

export const handleRequest = async (
  url,
  method,
  values = null,
  config = null
) => {
  try {
    if (method === VERBS["DELETE"]) {
      console.log(values);
      const { data } = await server.delete(url, {
        params: { ...values },
      });
      return data;
    }
    const { data } = await server[method](url, values, config);
    return data;
  } catch ({ response }) {
    handleErrors(response);
  }
};

const handleErrors = (response) => {
  if (!response) throw Error("Server Error");
  const { status, data } = response;
  if (status >= 400) {
    throw data;
  } else if (!data) {
    throw Error("Server Error");
  }
};
