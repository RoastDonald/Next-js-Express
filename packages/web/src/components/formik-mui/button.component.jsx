import React from "react";
import { Button, CircularProgress, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loadingIndecator: {
    marginLeft: 10,
  },
});

const ButtonUI = ({ variant, color, ...props }) => {
  const classes = useStyles();
  const { children, loading, link, ...rest } = props;
  const SpinnerAdornment = (props) => (
    <CircularProgress size={24} color="secondary" />
  );
  if (link) {
    return (
      <Link href={link} color="secondary">
        <Button {...rest}>{children}</Button>
      </Link>
    );
  }

  return (
    <Button {...rest} variant={variant} color={color}>
      {!loading ? (
        children
      ) : (
        <SpinnerAdornment className={classes.loadingIndecator} {...rest} />
      )}
    </Button>
  );
};

export default ButtonUI;
