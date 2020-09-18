import React from "react";
import DashboardLayout from "../../hoc/user-layout";
import Button from "../../components/common/button/button.component";

const UserDashboard = ({ currentUser }) => {
  return (
    <DashboardLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>{currentUser.name}</span>
            <span>{currentUser.surname}</span>
            <span>{currentUser.email}</span>
          </div>
          <Button link="/user/profile">Edit account info</Button>
        </div>
        <div className="user_nfo_panel">
          <h1>User history purchases</h1>
          <div className="user_product_block_wrapper">history</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
