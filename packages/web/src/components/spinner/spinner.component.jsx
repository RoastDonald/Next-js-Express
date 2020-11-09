import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useStyles } from './spinner.styles';

const Spinner = () => {
  const classes = useStyles();
  return (
    <Grid container height="100vh" className={classes.loaderWrapper}>
      <CircularProgress color="#fff" />
    </Grid>
  );
};

export default Spinner;
