import schemas from "@common/validation";
import { Button, Collapse, Grid, IconButton, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { registerStart } from "../../redux/user/user.actions";
import { slelectCurrentUserDomain } from "../../redux/user/user.selectors";
import Ffield from "../common/Ffield/Ffield.component";

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    justifyContent: "center",
    padding: 12,
    "& > .MuiGrid-container": {
      marginTop: 15,
    },
    "& .MuiSvgIcon-root": {
      fill: "#4e4e4e",
    },
  },
  registerOutter: {
    marginTop: -15,
  },

  registerBtn: {
    width: "90%",
  },
  registerBtnContainer: {
    alignItems: "center",
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
  },
  registerLink: {
    marginTop: 15,
  },
}));

const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const Register = ({ register, userMeta, toggleAuth }) => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (userMeta.currentUser || userMeta.error) {
      setLoading(false);
    }
  }, [userMeta.currentUser, userMeta.error]);
  return (
    <div className={classes.registerOutter}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validationSchema={schemas.register}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          register(values);
        }}
      >
        {() => (
          <Form>
            <Grid container xs={12} className={classes.registerContainer}>
              <Grid container xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Ffield
                    name="name"
                    placeholder="Enter your name"
                    label="Name"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Ffield
                    name="surname"
                    placeholder="Enter your surname"
                    label="Surname"
                  />
                </Grid>
              </Grid>

              <Grid container xs={12} spacing={2}>
                <Grid item xs={12}>
                  <Ffield
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                  />
                </Grid>
              </Grid>

              <Grid container xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Ffield
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    label="Password"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Ffield
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Confirm your password"
                    label="Repeat password"
                  />
                </Grid>
              </Grid>
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
              <div className={classes.registerBtnContainer}>
                <Button
                  className={classes.registerBtn}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled={isLoading}
                  loading={isLoading}
                  disableRipple={true}
                >
                  register
                </Button>
                <Link
                  color="grey"
                  className={classes.registerLink}
                  onClick={toggleAuth}
                >
                  Already have an account ?
                </Link>
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userMeta: slelectCurrentUserDomain,
});

const mapDispatchToProps = (dispatch) => ({
  register: (userCredentials) => dispatch(registerStart(userCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
