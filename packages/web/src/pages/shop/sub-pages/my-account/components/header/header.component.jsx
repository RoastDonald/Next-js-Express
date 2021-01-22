import React from 'react'
import { Link, Typography, Button } from '@material-ui/core';
import { FMButton } from '@/components/formik-mui';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '@/redux/user/user.selectors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import Roles from '@/utils/role';

const useStyles = makeStyles((theme) => ({
    root: {
        // boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
    },
    toolbar: {
        minHeight: '5rem',
        alignItems: 'center',
        backgroundColor: '#fff',


    },
    logo: {
        width: 56,
        height: 56,
    },
    logoBox: {
        display: "flex",
        color: "#161616",
        // textDecoration: "none",
        alignItems: "center",
    },
    logoText: {
        marginLeft: 15,
        fontWeight: 800,
        fontSize: 24
    },
    title: {
        justifySelf: 'center',
        color: "#2d2d2d",
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: 2,
        textTransform: 'uppercase',
        margin: ' 0 auto'

    },
    btnText: {
        fontSize: 16,
        color: 'white',
        textTransform: 'none'
    },
    btn: {
        backgroundColor: '#713bdb',

    }
}));




const Header = ({ currentUser }) => {
    console.log(currentUser.role === Roles.Admin);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0} >
                <Toolbar className={classes.toolbar} color="none">
                    <Link href="/" underline="none" className={classes.logoBox}>
                        <img src="/icons/logo.svg" className={classes.logo} />
                        <Typography className={classes.logoText}>Waves</Typography>
                    </Link>
                    <Typography className={classes.title}>My Account</Typography>
                    {currentUser.role === Roles.Admin ? (
                        <Link href='/dashboard'
                            style={{ textDecoration: 'none' }}
                        >
                            <FMButton
                                color="#713bdb"
                                variant="contained"
                                size="large"
                                disableRipple={true}
                                className={classes.btn}
                            >
                                <Typography className={classes.btnText} >Dashboard</Typography>
                            </FMButton>
                        </Link>
                    ) : null}
                </Toolbar>
            </AppBar>
        </div >
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});


export default connect(mapStateToProps)(Header);
