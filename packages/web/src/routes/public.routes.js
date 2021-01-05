import React, { lazy } from "react";
import { createRoutesFromArray } from "react-router-dom";
import ShopLayout from "@/pages/shop";
const Home = lazy(() => import("@/pages/shop/sub-pages/home"));

const ShopSubPages = {
  Showcase: import("@/pages/shop/sub-pages/showcase"),
  // MyAccount: import("@/pages/shop/sub-pages/my-account"),
};

const generateSubPages = (baseURL, pages, Wrapper) => {
  const keys = Object.keys(ShopSubPages);
  const generated = keys.map((key) => {
    return Object.assign(
      {},
      {
        element: pages[key],

        path: baseURL,
      }
    );
  });
  return createRoutesFromArray(generated);
};

export const publicRoutes = [
  {
    path: "/",
    element: (
      <ShopLayout>
        <Home />
      </ShopLayout>
    ),
  },
  [...generateSubPages("/ ", ShopSubPages, ShopLayout)],
];
