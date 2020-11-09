import React from "react";
import DashboardLayout from "../../hoc/user-layout/user-layout";

import AddProduct from "./components/add-product/add-product.component";
import ManageUsers from './components/manage-users/manage-users.component';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { FMButton } from '@/components/formik-mui';

const Panel = (props) => (
  <div className="user_nfo_panel">
    <h1>User information</h1>
    <div>
      {/* <span>{currentUser.name}</span> */}
      {/* <span>{currentUser.surname}</span> */}
      {/* <span>{currentUser.email}</span> */}
    </div>
    <FMButton link="/user/profile">Edit account info</FMButton>
  </div>
  // <div className="user_nfo_panel">
  //   <h1>User history purchases</h1>
  //   <div className="user_product_block_wrapper">history</div>
  // </div>
);

const UserDashboard = ({ currentUser }) => {
  const { path, url } = useRouteMatch();
  return (
    <DashboardLayout>
      <Switch>
        <Route exact path={`${path}/dashboard`} component={Panel} />
        <Route path={`${path}/profile`} component={Panel} />

        <Route path={`${path}/add-product`} component={AddProduct} />
        <Route path={`${path}/users`} component={ManageUsers} />
      </Switch>
    </DashboardLayout>
  );
};

export default UserDashboard;
