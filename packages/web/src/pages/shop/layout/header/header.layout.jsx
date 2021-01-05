import {
  AppBar,
  CircularProgress,
  IconButton,
  Link,
  Toolbar,
  Box,
  Drawer,
  Button
} from "@material-ui/core";
import clsx from "clsx";
import { Menu, MenuItem } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
            {renderCurrentLinks(links.user)}
            <Menu
              className={classes.menuContainer}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <AccountCircleIcon />
                <Link href="/my-account" underline="none">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={logout} style={{ color: "#f44336" }}>
                <ExitToAppIcon style={{ fill: "#f44336" }} />
                <span>Log out</span>
                {/* <CircularProgress size={12} color="secondary" /> */}
              </MenuItem>
            </Menu>
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
