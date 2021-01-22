import { FMButton, FMTextField } from '@/components/formik-mui';
import { GoogleSignIn, FacebookSignIn } from '@/components';
import { Typography } from '@material-ui/core';
import { loginStart, authGoogleStart } from "@/redux/user/user.actions";
import { slelectCurrentUserDomain } from "@/redux/user/user.selectors";
import schemas from "@common/validation";
import { Collapse, IconButton, InputAdornment, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Close as CloseIcon,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";





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
    textTransform: 'capitalize',
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
  methodsContainer: {
    marginTop: 15,
    width: '100%'
  },
  methodsTitle: {
    textAlign: 'center',
    position: 'relative',
    "&::before": {
      content: "''",
      display: 'block',
      backgroundColor: '#404040',
      width: '40%',
      position: 'absolute',
      top: '50%',
      left: 0,
      height: 2
    },
    "&::after": {
      content: "''",
      display: 'block',
      backgroundColor: '#404040',
      width: '40%',
      position: 'absolute',
      top: '50%',
      right: 0,
      height: 2
    }
  }
}));

const initialValues = {
  email: "",
  password: "",
};

const LoginBlock = ({ login, userMeta, toggleAuth, authGoogle }) => {
  const [isLoading, setLoading] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [isPassVisable, setPassVisable] = useState(false);
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
      if (Object.keys(userMeta.error || {})) setLoading(false);
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
          login(values);
        }}
      >
        {() => (
          <Form className={classes.form}>
            <FMTextField
              name="email"
              type="email"
              placeholder="Enter your login"
              label="Login"
              disabled={isLoading}
            />
            <FMTextField
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
              <FMButton
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
              </FMButton>
              <div className={classes.methodsContainer}>
                <Typography className={classes.methodsTitle}>OR</Typography>
                <div className={classes.methodsContent}>
                  <GoogleSignIn handleLogin={authGoogle} setLoading={setLoading} />
                  <FacebookSignIn />
                </div>
              </div>

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
  login: (userCredentials) => dispatch(loginStart(userCredentials)),
  authGoogle: (googleData) => dispatch(authGoogleStart(googleData)),
});

export default connect(mapStateToProps, mapDispachToProps)(LoginBlock);
