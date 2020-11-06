import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function M1Alert({text,isSaved,handleAlertClose}) {
  const classes = useStyles();



  return (
      <Snackbar open={true} autoHideDuration={6000} onClose={handleAlertClose}  anchorOrigin={{vertical: 'top',
      horizontal: 'center'}}
      >
        <Alert onClose={handleAlertClose} severity={isSaved?"success":"error"}>
          {text}
        </Alert>
      </Snackbar>
  );
}
