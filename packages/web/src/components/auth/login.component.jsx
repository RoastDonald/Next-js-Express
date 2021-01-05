import { FMButton, FMTextField } from '@/components/formik-mui';
import { loginStart } from "@/redux/user/user.actions";
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
});

export default connect(mapStateToProps, mapDispachToProps)(LoginBlock);
