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
                <Formik
                    initialValues={initialValues}
                    // validateOnChange={true}
                    // validationSchema={schemas.editUser}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >{() => (
                    <>
                        <DialogTitle>
                            <Typography
                                variant="subtitle"
                                className={classes.editDialog}
                            >
                                Edit User
                    </Typography>
                        </DialogTitle>
                        <DialogContent>

                            <Form>
                                <FMTextField
                                    name="name"
                                    type="text"
                                    label="name"
                                    className={classes.textField}
                                    disabled={isFetching}
                                />
                                <FMTextField
                                    name="surname"
                                    type="text"
                                    label="surname"
                                    className={classes.textField}

                                    disabled={isFetching}
                                />
                                <FMTextField
                                    name="email"
                                    type="email"
                                    label="email"
                                    className={classes.textField}

                                    disabled={isFetching}
                                />

                                <FMSelectField
                                    placeholder="Role"
                                    name="role"

                                    items={rolesObj}
                                    disabled={isFetching}
                                />
                            </Form>
                        </DialogContent>
                        <DialogActions style={{
                            width: '80%', margin: '0 auto',
                            paddingRight: 0
                        }}>
                            <Button
                                className={classes.cancelBtn}
                                onClick={toggleDialog}
                                color="primary"
                                disabled={isFetching}
                            >
                                Cancel
                    </Button>
                            <Button
                                color="primary"
                                type="submit"
                                className={classes.editIcon}
                                disabled={state.isFetching}
                                autoFocus
                            >
                                {!state.isFetching ? 'Edit' : (<CircularProgress size={16} />)}
                            </Button>
                        </DialogActions>
                    </>
                )}

                </Formik>
            </Dialog>
        </Fragment>
    )
}

export default EditDialog;