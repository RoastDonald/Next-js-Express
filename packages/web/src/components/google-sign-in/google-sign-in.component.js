import React from "react";
import { GoogleLogin } from "react-google-login";
import useStyles from "./google-sign-in.styles";

const GoogleSignIn = ({ handleLogin, setLoading }) => {
  const classes = useStyles();
  const onAction = (googleData) => {
    setLoading(true);
    handleLogin(googleData);
  };

  return (
    <GoogleLogin
      className={classes.root}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login With Google"
      onSuccess={onAction}
      onFailure={onAction}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleSignIn;
