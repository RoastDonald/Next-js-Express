import React, { lazy } from "react";
import MyAccount from "@/pages/shop/sub-pages/my-account";
import SecureRoute from "@/hoc/secure-route";
import Roles from "@/utils/role";
import Spinner from "@/components/spinner/spinner.component";
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

const MyAccountModules = {
  Overview: lazy(() =>
    import("@/pages/shop/sub-pages/my-account/modules/overview/overview.module")
  ),
  Details: lazy(() =>
    import("@/pages/shop/sub-pages/my-account/modules/details/details.module")
  ),
};

export const privateRoutes = [
  {
    path: "/my-account",
    element: (
      <SecureRoute
        path={["/my-account"]}
        roles={[Roles.User, Roles.Admin]}
        component={(props) => <MyAccount {...props} />}
      />
    ),
    children: [
      {
        path: "/",
        element: <MyAccountModules.Overview />,
      },
      {
        path: "/profile",
        element: <MyAccountModules.Details />,
      },
      {
        path: "/cart",
        element: <div>322222</div>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <SecureRoute
        path={["/dashboard"]}
        roles={[Roles.Admin]}
        component={(props) => <DashboardLayout {...props} />}
      />
    ),
    children: [
      {
        path: "/",
        element: <DashboardModules.ManageUsers />,
      },
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
