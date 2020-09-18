import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selectors";
const SecureRoute = ({
  component: Component,
  afterAuthAccess = true,
  roles,
  currentUser,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        if (roles && roles.indexOf(currentUser.role) === -1) {
          return <Redirect to={{ pathname: "/" }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SecureRoute);
