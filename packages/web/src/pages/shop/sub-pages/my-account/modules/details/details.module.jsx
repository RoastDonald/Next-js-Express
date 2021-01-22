import React from 'react'
import { Typography } from '@material-ui/core';
import { Alert } from '@/components';
import { makeStyles } from '@material-ui/core/styles';
import { selectCurrentUser } from '@/redux/user/user.selectors';
import { selectAlertDomain } from '@/redux/alert/alert.selectors';
import { updateUserAccountStart } from '@/redux/user/user.actions';
import { hideAlert } from '@/redux/alert/alert.actions';
import { createStructuredSelector } from 'reselect';
import schemas from "@common/validation";

import { connect } from 'react-redux';
import {
    SettingsApplications as SettingsApplicationsIcon,
} from "@material-ui/icons";


import { FMButton, FMTextField } from '@/components/formik-mui';

import { Form, Formik } from "formik";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'calc(100% - 40px)',
        margin: '40px 0',
        marginLeft: 'auto',
    },
    header: {
        display: 'flex',
        flexDirection: 'column'
    },
    headerTitle: {
        marginTop: 5,
        fontWeight: 700,
        fontSize: 24,
        textTransform: 'uppercase'
    },
    headerSubtitle: {
        marginTop: 5,
        fontSize: 12,
        letterSpacing: 0.5,
        fontWeight: 300
    },
    headerIcon: {
        width: 48,
        height: 48
    },
    form: {
        marginTop: 20,
        width: '60%',
        "& > div:not(:first-child)": {
            marginTop: 15
        }
    },
    submitBtn: {
        backgroundColor: '#2d2d2d',
        width: '100%',
        marginTop: 20,
        fontWeight: 700,
    },
    alert: {
        position: 'relative',
        "& > .MuiPaper-root": {
            width: '60%',
            marginRight: 'auto',

        }
    }
}));

const Details = ({ currentUser, update, alert, hideAlert }) => {
    const classes = useStyles();

    const initialValues = {
        firstName: currentUser.name,
        lastName: currentUser.surname,
        email: currentUser.email
    }



    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <SettingsApplicationsIcon className={classes.headerIcon} />
                <Typography className={classes.headerTitle}>My Details</Typography>
                <Typography className={classes.headerSubtitle}>Feel free to edit any of your details below so your Wave account is totally up to date.</Typography>
            </div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validateOnChange={true}
                    validationSchema={schemas.updateUser}
                    onSubmit={(values) => {
                        update(values);
                    }}
                >
                    {({ values }) => {
                        const isChanged = JSON.stringify(initialValues) !== JSON.stringify(values);
                        return (
                            <Form className={classes.form}>
                                <FMTextField
                                    name="firstName"
                                    type="text"
                                    placeholder="Enter your first name"
                                    label="First name"
                                // disabled={isLoading}
                                />
                                <FMTextField
                                    name="lastName"
                                    type="text"
                                    placeholder="Enter your last name"
                                    label="Last name"
                                // disabled={isLoading}
                                />
                                <FMTextField
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    label="Email"
                                // disabled={isLoading}
                                />
                                <FMButton
                                    className={classes.submitBtn}
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    disabled={!isChanged}
                                    // loading={isLoading}
                                    disableRipple={true}
                                >
                                    save changes
                                </FMButton>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
            <Alert isOpen={alert.open} message={alert.message} time={alert.time} handleAlertClose={hideAlert} className={classes.alert} />

        </div>)

}



const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    alert: selectAlertDomain
});
const mapDispatchToProps = dispatch => ({
    update: (newProps) => dispatch(updateUserAccountStart(newProps)),
    hideAlert: () => dispatch(hideAlert()),

});
export default connect(mapStateToProps, mapDispatchToProps)(Details);
