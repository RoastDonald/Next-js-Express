import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { Spinner } from "@/components";

const App = () => {
  const routing = useRoutes(routes);
  return <Suspense fallback={<Spinner />}>{routing}</Suspense>;
};

export default App;
