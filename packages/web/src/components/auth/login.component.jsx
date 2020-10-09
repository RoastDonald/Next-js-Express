import React, { useState, useEffect } from "react";
import schemas from "@common/validation";
import { Formik, Form } from "formik";
import { createStructuredSelector } from "reselect";
import { slelectCurrentUserDomain } from "../../redux/user/user.selectors";
import M1TextField from "../common/material-controll/text-field.component";
import { connect } from "react-redux";
import { Collapse, IconButton, InputAdornment, Link } from "@material-ui/core";
import {
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { loginStart } from "../../redux/user/user.actions";
import Button from "../common/button/button.component";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  form: {
    "& > *:not(:last-child)": {
      marginBottom: 20,
    },
    "& .MuiSvgIcon-root": {
      fill: "#4e4e4e",
    },
  },
  loginBtnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginBtn: {
    marginTop: 12,
    width: "60%",
    margin: "0 auto",
  },
  loginCtaContainer: {
    marginTop: 15,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    "& > *:not(:last-child)": {
      marginBottom: 8,
    },
  },
}));

const initialValues = {
  email: "",
  password: "",
};

const LoginBlock = ({ login, userMeta, toggleAuth }) => {
  const [isLoading, setLoading] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [isPassVisable, setPassVisable] = useState(false);
  console.log(isPassVisable);
  const handlePasswordVisibility = () => {
    setPassVisable(!isPassVisable);
  };

  useEffect(() => {
    if (userMeta.error) {
      setErrorOpen(true);
    }
  }, [userMeta.error]);
  useEffect(() => {
    if (userMeta.currentUser || userMeta.error) {
      if (Object.keys(userMeta.error)) setLoading(false);
    }
  }, [userMeta.currentUser, userMeta.error]);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validationSchema={schemas.login}
        onSubmit={(values) => {
          setLoading(true);
          login(values).then((err) => {});
        }}
      >
        {() => (
          <Form className={classes.form}>
            <M1TextField
              name="email"
              type="email"
              placeholder="Enter your login"
              label="Login"
              disabled={isLoading}
            />
            <M1TextField
              name="password"
              type={isPassVisable ? "text" : "password"}
              placeholder="Enter your password"
              label="Password"
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                    >
                      {isPassVisable ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {!userMeta.error ? null : (
              <Collapse in={!!userMeta.error && isErrorOpen}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setErrorOpen(false)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {userMeta.error.message}
                </Alert>
              </Collapse>
            )}
            <div className={classes.loginBtnContainer}>
              <Button
                className={classes.loginBtn}
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                disabled={isLoading}
                loading={isLoading}
                disableRipple={true}
              >
                login
              </Button>
              <div className={classes.loginCtaContainer}>
                <Link onClick={toggleAuth} color="grey">
                  Create an account?
                </Link>
                <Link color="grey">Forgot password?</Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userMeta: slelectCurrentUserDomain,
});

const mapDispachToProps = (dispatch) => ({
  login: async (userCredentials) => await dispatch(loginStart(userCredentials)),
});

export default connect(mapStateToProps, mapDispachToProps)(LoginBlock);
