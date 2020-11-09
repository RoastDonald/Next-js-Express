import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, DialogContentText } from '@material-ui/core';
import React, { useState } from 'react';
import API_CONTROLLER from '@/api/controller.api';
import DeleteIcon from "@material-ui/icons/Delete";
import { Alert } from '@/components';


const DeleteDialog = ({ classes, user, getUsers }) => {
    const [state, setState] = useState({
        isOpen: false,
        isFetching: false,
        error: null
    });
    const [alert, setAlert] = useState({
        message: '',
        isSaved: null,
        show: false
    });
    const handleAlertClose = () => {
        setAlert({ ...alert, show: false });
    }

    const handleDeleting = async (email) => {
        try {
            setState({
                ...state,
                isFetching: true
            });
            await API_CONTROLLER.deleteUser({ email });
            setState({
                ...state,
                isOpen: false
            });
            setAlert({
                ...alert,
                show: true,
                message: `User ${email} was deleted successfully`,
                isSaved: true
            });
            getUsers();
        } catch (error) {
            setState({
                ...state,
                isOpen: false
            });
            setAlert({
                ...alert,
                show: true,
                message: `Cannot delete user, try later`,
                isSaved: false
            });
        }
    }


    const handleClickOpen = () => {
        setState({
            ...state,
            isOpen: true
        });

    };


    const handleClose = () => {
        setState({
            ...state,
            isOpen: false
        });
    };
    const { isOpen, isFetching, error } = state;
    return (
        <React.Fragment>
            <IconButton className={`${classes.deleteIcon} ${classes.iconButton}`} onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>

            <Dialog
                disableBackdropClick={isFetching}
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" >
                    <Typography variant="subtitle" className={classes.editDialog}>
                        Delete
        <Typography
                            variant="subtitle2"
                            className={classes.userEmailDialog}>
                            {user.email}
                        </Typography> account ?
        </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="subtitle2" color="primary">All user data will be erased</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" disabled={isFetching} >
                        Cancel
        </Button>
                    <Button onClick={() => handleDeleting(user.email)} color="primary" autoFocus className={classes.deleteIcon} disabled={state.isFetching}>
                        {!isFetching ? 'Delete' : (<CircularProgress size={16} />)}
                    </Button>
                </DialogActions>
            </Dialog>
            {!alert.show ? null : <Alert text={alert.message} isSaved={alert.isSaved} handleAlertClose={handleAlertClose} />}
        </React.Fragment>
    )
};

export default DeleteDialog;