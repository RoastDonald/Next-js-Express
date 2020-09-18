import React from "react";
import RegisterBlock from "../../components/auth/register.component";
import { Redirect } from "react-router-dom";

const Register = ({ currentUser }) => {
  if (currentUser) return <Redirect to="/user/dashboard" />;
  return <RegisterBlock />;
};

export default Register;
