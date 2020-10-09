import React from "react";
import "../../styles/spinner.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  loaderWrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Spinner = () => {
  const classes = useStyles();
  return (
    <Grid container height="100vh" className={classes.loaderWrapper}>
      <CircularProgress color="secondary" />
    </Grid>
  );
};

export default Spinner;
