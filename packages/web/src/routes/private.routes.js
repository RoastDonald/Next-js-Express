import React, { lazy } from "react";

import SecureRoute from "@/hoc/secure-route";
import Roles from "@/utils/role";
const ShopLayout = lazy(() => import("@/pages/shop"));
const DashboardLayout = lazy(() => import("@/pages/dashboard"));

const DashboardModules = {
  EditUser: lazy(() =>
    import("@/pages/dashboard/modules/edit-user/edit-user.module")
  ),
  AddProduct: lazy(() =>
    import("@/pages/dashboard/modules/add-product/add-product.module")
  ),
  ManageUsers: lazy(() =>
    import("@/pages/dashboard/modules/manage-users/manage-users.component")
  ),
};

export const privateRoutes = [
  {
    path: "/my-account",
    element: (
      <SecureRoute
        path={["/my-account"]}
        roles={[Roles.User, Roles.Admin]}
        component={(props) => (
          <ShopLayout>
            <div>test</div>
          </ShopLayout>
        )}
      />
    ),
  },
  {
    path: "dashboard",
    element: (
      <SecureRoute
        path={["/dashboard"]}
        roles={[Roles.Admin]}
        component={(props) => <DashboardLayout {...props} />}
      />
    ),
    children: [
      {
        path: "add-product",
        element: <DashboardModules.AddProduct />,
      },
      {
        path: "users",
        element: <DashboardModules.ManageUsers />,
      },
    ],
  },
];
