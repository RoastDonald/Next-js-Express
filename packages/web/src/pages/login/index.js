import React, { useEffect } from "react";
import { Grid, Box, Paper, Collapse } from "@material-ui/core";
import { clearError } from "@/redux/user/user.actions";
import { useNavigate } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { slelectCurrentUserDomain } from "@/redux/user/user.selectors";
import { Login, Register } from "@/components/auth";
import { useStyles } from "./styles";
import { connect } from "react-redux";
const AuthPage = ({ userMeta, clearError }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isLogin, setLogin] = React.useState(true);
  const [isRegister, setRegister] = React.useState(false);
  const toggleAuth = () => {
    clearError();
    setLogin(!isLogin);
  };

  useEffect(() => {
    if (userMeta.currentUser) navigate("/my-account", { replace: true });
  });

  return (
    <Grid container className={classes.container} direction="row">
      <Grid item md={5}>
        <Paper component="div" className={classes.loginImage} />
      </Grid>
      <Grid item md={7} sm={6} xs={12} className={classes.loginBlock}>
        <Box className={classes.loginContainer}>
          <h2>Enter to Waves</h2>
          <p>If you have an account please log in.</p>

          <Collapse
            in={isLogin}
            onExited={() => setRegister(true)}
            onEnter={() => setRegister(false)}
            timeout={500}
          >
            <Login toggleAuth={toggleAuth} />
          </Collapse>
          <Collapse
            in={isRegister}
            timeout={500}
            onExited={() => setLogin(true)}
            onEnter={() => setLogin(false)}
          >
            <Register toggleAuth={toggleAuth} />
          </Collapse>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  userMeta: slelectCurrentUserDomain,
});

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
