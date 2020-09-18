import React from "react";
import { Grid, Box, Paper, Button, Collapse } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Login from "../../components/auth/login.component";
import Register from "../../components/auth/register.component";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    backgroundImage: `url(/images/login_bck.jpg)`,
    backgroundRepeat: "no-repeat",
    transition: "all 0.3s ease",
    backgroundSize: "cover",
    "& > .MuiGrid-item": {
      padding: 0,
    },
    minHeight: "100vh",
    [`${theme.breakpoints.down("sm")} `]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  text: {
    ...theme.typography.text,
  },
  loginImage: {
    background: `url(/images/login_image.jpg)`,
    backgroundSize: "cover",
    transition: "all 0.3s ease",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%",
  },
  loginBlock: {
    flexDirection: "column",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  loginContainer: {
    borderRadius: "15px",
    backgroundColor: "aliceblue",
    padding: "25px 10px",
    width: "50%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [`${theme.breakpoints.down("sm")} `]: {
      width: "100%",
      marginTop: "15vh",
    },
  },
}));

const AuthPage = ({ currentUser }) => {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(4);
  const [isLogin, setLogin] = React.useState(true);
  const [isRegister, setRegister] = React.useState(false);
  const toggleAuth = () => {
    setLogin(!isLogin);
  };

  if (currentUser) return <Redirect to="/user/dashboard" />;
  return (
    <Grid
      container
      className={classes.container}
      direction="row"
      spacing={spacing}
    >
      <Grid item xs={5}>
        <Paper component="div" className={classes.loginImage} />
      </Grid>
      <Grid item xs={7} className={classes.loginBlock}>
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

export default AuthPage;
