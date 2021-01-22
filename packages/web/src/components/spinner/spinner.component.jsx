import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useStyles } from './spinner.styles';
import { ReactComponent as LogoSVG } from '@/ui/icons/logo.svg';
const Spinner = () => {
  const classes = useStyles();
  return (
    <Grid container height="100vh" className={classes.loaderWrapper}>
      <div style={{ position: 'relative' }}>
        <CircularProgress color="#fff" size={56} />
        <LogoSVG className={classes.logo} />
      </div>

    </Grid>
  );
};

export default Spinner;
