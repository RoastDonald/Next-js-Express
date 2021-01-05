import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import EditIcon from "@material-ui/icons/Edit";
import API_CONTROLLER from '@/api/controller.api';
import { Formik, Form } from 'formik';
import schemas from '@common/validation';

import roles from '@/utils/role';
import { FMSelectField, FMTextField } from '@/components/formik-mui';


const EditDialog = ({ classes, user, getUsers }) => {
    const [state, setState] = useState({
        isOpen: false,
        isFetching: false,
        error: null
    });

    const rolesObj = Object.keys(roles).reduce((base, role) => {
        return [...base, { _id: roles[role], name: role }]
    }, []);

    const initialValues = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role
    }
    const toggleDialog = () => {
        const { isOpen } = state;
        setState({
            ...state,
            isOpen: !isOpen
        });
    }



    const editUser = async () => {
        try {
            setState({
                ...state,
                isFetching: true
            });
            // await API_CONTROLLER.deleteUser(email);
            getUsers();
        } catch (error) {
            setState({
                ...state,
                error
            });
        } finally {
            setState({
                ...state,
                isOpen: false,
                isFetching: false
            });
        }
    }






    const { isFetching, isOpen } = state;
    return (
        <Fragment>
            <IconButton
                className={`${classes.editIcon} ${classes.iconButton}`}
                onClick={toggleDialog}
            >
                <EditIcon />
            </IconButton>
            <Dialog
                disableBackdropClick={isFetching}
                open={isOpen}
                onClose={toggleDialog}
            >
                <DialogTitle  >
                    <Typography
                        variant="subtitle"
                        className={classes.editDialog}
                    >
                        Edit Document
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        // validateOnChange={true}
                        // validationSchema={schemas.editUser}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >{
                            () => (
                                <Form>
                                    <FMTextField
                                        name="name"
                                        type="text"
                                        label="name"
                                        disabled={isFetching}
                                    />
                                    <FMTextField
                                        name="surname"
                                        type="text"
                                        label="surname"
                                        disabled={isFetching}
                                    />
                                    <FMTextField
                                        name="email"
                                        type="email"
                                        label="email"
                                        disabled={isFetching}
                                    />

                                    <FMSelectField
                                        label="Role"
                                        name="role"
                                        items={rolesObj}
                                        disabled={isFetching}
                                    />
                                </Form>
                            )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={toggleDialog}
                        color="primary"
                        disabled={isFetching}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={editUser}
                        color="primary"
                        className={classes.editIcon}
                        disabled={state.isFetching}
                        autoFocus
                    >
                        {!state.isFetching ? 'Edit' : (<CircularProgress size={16} />)}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default EditDialog;