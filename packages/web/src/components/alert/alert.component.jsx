import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from './alert.styles';

const Container = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alert = ({ text, isSaved, handleAlertClose }) => {
  const classes = useStyles();

  return (
    <Snackbar open={true} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    >
      <Container onClose={handleAlertClose} severity={isSaved ? "success" : "error"}>
        {text}
      </Container>
    </Snackbar>
  );
}

export default Alert;
