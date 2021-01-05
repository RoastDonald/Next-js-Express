import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import { publicRoutes } from "./public.routes";
import { privateRoutes } from "./private.routes";

const Login = lazy(() => import("@/pages/login"));
const NotFound = lazy(() => import("@/pages/404"));

export const routes = [
  ...publicRoutes,
  ...privateRoutes,
  { path: "/login", element: <Login /> },
  { path: "404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" /> },
];

export default routes;
