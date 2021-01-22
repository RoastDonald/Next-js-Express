import React from "react";
import FacebookLoginBtn from "react-facebook-login";
import FacebookIcon from "@material-ui/icons/Facebook";
import { makeStyles } from "@material-ui/core/styles";

const FacebookSignIn = () => {
  const responseFacebook = (response) => {
    console.log(response.accessToken);
  };

  return (
    <FacebookLoginBtn
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad={false}
      callback={responseFacebook}
      icon={<FacebookIcon style={{ fill: "#fff", marginRight: "21%" }} />}
      //   containerStyle={{
      //     width: "100%",
      //     display: "block",
      //   }}
      buttonStyle={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 500,
        borderRadius: 2,
        padding: "6px 10px",
      }}
      disableMobileRedirect
      size="small"
    />
  );
};

export default FacebookSignIn;
