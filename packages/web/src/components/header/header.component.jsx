import {
  AppBar,
  CircularProgress,
  IconButton,
  Link,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu, MenuItem } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { logoutStart } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import Button from "../common/button/button.component";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "rgb(173,165,165)",
    background:
      "linear-gradient(0deg, rgba(173,165,165,0) 0%, rgba(0,0,0,0.6931723372942927) 100%)",
  },
  toolbar: {
    minHeight: theme.customStyles.headerHeight,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  logoBox: {
    display: "flex",
    marginLeft: 16,
    color: "#fff",
    textDecoration: "none",
  },
  menuContainer: {
    padding: 30,
    marginTop: "50px",
  },
  siteMeta: {
    display: "flex",
    marginLeft: 16,
  },
  logo: {
    width: 64,
    height: 64,
  },
  logoTitle: {
    fontWeight: 800,
    marginLeft: 30,
  },
  headerIcon: {
    position: "relative",
    width: 36,
    height: 36,
  },
  cartContainer: {
    minWidth: "300px",
  },
  headerNavList: {
    "& > *:not(:last-child)": {
      marginRight: 20,
    },
  },
  cartLength: {
    color: "#fff",
    left: "5px",
    top: "28px",
    width: "20px",
    height: "20px",
    position: "absolute",
    fontSize: 12,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: theme.palette.secondary.light,
  },
  loginButton: {
    borderColor: "#fff",
    color: "#fff",
  },
}));

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
        public: true,
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
    <>
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
    </>
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
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="person icon"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <PersonIcon className={classes.headerIcon} />
            </IconButton>
            <Menu
              className={classes.menuContainer}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <AccountCircleIcon />
                <Link href="/user/dashboard" underline="none">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={logout} style={{ color: "#f44336" }}>
                <ExitToAppIcon style={{ fill: "#f44336" }} />
                <span>Log out</span>
                <CircularProgress size={12} color="secondary" />
              </MenuItem>
            </Menu>
          </>
        );
      } else {
        return (
          <Link href={to}>
            <Button
              className={classes.loginButton}
              key={idx}
              variant="outlined"
              size="large"
              disableRipple={true}
            >
              {name}
            </Button>
          </Link>
        );
      }
    });
  };

  return (
    <AppBar
      position="fixed"
      className={classes.root}
      style={{ boxShadow: "none" }}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.siteMeta}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon className={classes.menuButton} />
          </IconButton>
          <div>
            <Link href="/" className={classes.logoBox} underline="none">
              <img src="/icons/logo.svg" className={classes.logo} />
              <h1 className={classes.logoTitle}>Waves</h1>
            </Link>
          </div>
        </div>
        <div className={classes.headerNavList}>
          {renderCurrentLinks(links.user)}
        </div>
        {/* <div>{renderCurrentLinks(links.page)}</div> */}
      </Toolbar>
    </AppBar>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutStart()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
