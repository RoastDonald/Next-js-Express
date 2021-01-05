import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selectors";
const SecureRoute = ({
  component: Component,
  afterAuthAccess = true,
  roles,
  currentUser,
  ...rest
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) navigate("/login", { replace: true });
    if (roles && roles.indexOf(currentUser.role) === -1) {
      navigate("/", { replace: true });
    }

  }, [])

  return <Component {...rest} />;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SecureRoute);
