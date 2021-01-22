import {
    AppBar,
    CircularProgress,
    IconButton,
    Link,
    Toolbar,
    Box,
    Drawer,
    Button,
    Switch
} from "@material-ui/core";
import clsx from "clsx";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from '@material-ui/icons/Notifications';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {
    Menu as MenuIcon,
    Person as PersonIcon,
    ShoppingBasketOutlined,
} from "@material-ui/icons";
import React, { useRef, useState, Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { logoutStart } from "@/redux/user/user.actions";
import { selectCurrentUser } from "@/redux/user/user.selectors";

import { FMButton } from "@/components/formik-mui";
import { useStyles } from './header.styles';

import { ReactComponent as FilterIcon } from '@/ui/icons/filter.svg';


const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 20,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(20px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 18,
        height: 18,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});




const Header = ({ logout, currentUser }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    };
    const [state, setState] = React.useState(false);
    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false);
    };
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState(open);
    };
    const { current: links } = useRef({
        page: [
            {
                name: "Home",
                to: "/",
                public: true,
            },
            {
                name: "Guitars",
                to: "/shop",
                public: false,
            },
        ],
        user: [
            {
                name: "My Cart",
                to: "/user/cart",
                public: false,
            },
            {
                name: "My Profile",
                to: "/user/profile",
                public: false,
            },
            {
                name: "Log in",
                to: "/login",
                public: true,
            },
        ],
    });
    const renderCartLink = (name, to, idx) => (
        <Fragment key={idx}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="shopping cart"
                onClick={toggleDrawer("right", true)}
            >
                <div className={classes.cartLength}>
                    <span>{currentUser.cart.length}</span>
                </div>
                <ShoppingBasketOutlined className={classes.headerIcon} />
            </IconButton>
            <SwipeableDrawer
                anchor="right"
                open="right"
                open={state}
                onClose={toggleDrawer("right", false)}
                onOpen={toggleDrawer("right", true)}
            >
                <div className={classes.cartContainer}></div>
            </SwipeableDrawer>
        </Fragment>
    );

    const renderCurrentLinks = (_links) => {
        const links = _links.filter((link) => {
            if (link.public && !currentUser) return true;
            if (!link.public && currentUser) return true;
            else return false;
        });

        return renderLinks(links);
    };

    const renderLinks = (links) => {
        return links.map(({ name, to }, idx) => {
            if (to === "/user/cart") {
                return renderCartLink(name, to, idx);
            } else if (to === "/user/profile") {
                return (
                    <IconButton
                        key={idx}
                        edge="start"
                        color="inherit"
                        aria-label="person icon"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        key={idx}
                    >
                        <PersonIcon className={classes.headerIcon} />
                    </IconButton>
                );
            } else {
                return (
                    <Link href={to}
                        key={idx}
                    >
                        <FMButton
                            className={classes.loginButton}
                            variant="outlined"
                            size="large"
                            disableRipple={true}
                        >
                            {name}
                        </FMButton>
                    </Link>
                );
            }
        });
    };

    const userAvatarSign = `${currentUser.name.charAt(0)}${currentUser.surname.charAt(0)}`;
    return (
        <Fragment>
            <AppBar
                position="fixed"
                // className={classes.root}
                className={clsx(classes.root, {
                    [classes.appBarShift]: false,
                })}
                style={{ boxShadow: "none" }}
            >
                <Toolbar className={classes.toolbar} disableGutters={true}>
                    <Box display={{ xs: "flex", sm: "none" }} alignItems="center">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon className={classes.menuButton} />
                        </IconButton>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        className={classes.logoContainer}
                    >
                        <Link href="/" underline="none" className={classes.logoBox}>
                            <img src="/icons/logo.svg" className={classes.logo} />
                            <h1 className={classes.logoTitle}>Waves Panel
  </h1>
                        </Link>

                    </Box>
                    <Box className={classes.searchBar}>
                        <Box>
                            <Button className={classes.filterBtn} disableRipple={true}>
                                <span>Filters</span>
                                <FilterIcon />
                            </Button>
                        </Box>

                    </Box>
                    <Box
                        display={{ xs: "none", sm: "flex" }}
                        className={classes.headerNavList}
                    >
                        <Box className={classes.userBox}>
                            <Box className={classes.userBoxContent}>
                                <IconButton style={{ marginRight: 12 }}>
                                    <NotificationsIcon />
                                </IconButton>
                                <Typography className={classes.userAvatar}>
                                    <span className={classes.userAvatarSign}>{userAvatarSign}</span>
                                </Typography>
                                <Box className={classes.userMeta}>
                                    <Typography className={classes.role}>
                                        {currentUser.role ? 'admin' : 'user'}
                                    </Typography>
                                    <Typography className={classes.username}>
                                        {currentUser.name}
                                    </Typography>
                                </Box>
                            </Box>

                        </Box>
                        <Box className={classes.modeSwitcher}>
                            <Brightness4Icon size={24} />
                            <IOSSwitch checked={true} onChange={() => { }} name="checkedB" />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={false}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
            </Drawer>
        </Fragment>
    );
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutStart()),
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
