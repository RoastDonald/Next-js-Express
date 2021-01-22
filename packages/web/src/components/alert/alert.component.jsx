import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from './alert.styles';

const Container = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alert = ({ isOpen, handleAlertClose, type, message, time = 2000, className = {} }) => {
  const classes = useStyles();

  return (
    <Snackbar open={isOpen} autoHideDuration={time} onClose={handleAlertClose} anchorOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
      className={className}
    >
      <Container onClose={handleAlertClose} severity={type}>
        {message}
      </Container>
    </Snackbar>
  );
}

export default Alert;
