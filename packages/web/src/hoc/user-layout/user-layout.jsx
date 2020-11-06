import { Grid, Typography, Drawer } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HttpIcon from "@material-ui/icons/Http";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SupervisedUserCircleOutlined from '@material-ui/icons/SupervisedUserCircleOutlined';
import {
  SettingsApplications as SettingsApplicationsIcon,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import Roles from "../../utils/role";
import NavItem from "./nav-item";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    flex: "0 0 80%",
  },

  dashboardControll: {
    zIndex: 0,
    display: "flex",
    justifyContent: "center",
  },
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: '#191919',
    padding: 30,
    borderRadius: 15,
    minHeight:'100vh'
  },
  dashboardControllIcon: {
    "& .MuiSvgIcon-root": {
      fill: "#000",
    },
  },
  root: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  dashboardInner: {

    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: "15vh",
    marginBottom: 50,
  },
  active: {
    backgroundColor: "#fff",
    color: "#000",

  },
  sectionTilte: {
    marginTop: 20,
  },
}));

const linksEnum = {
  MY_ACCOUNT: "My account",
  ADMIN: "Admin",
};

const links = {
  "My account": {
    items: [
      {
        title: "My account",
        link: "/user/dashboard",
        icon: AccountCircleIcon,
      },
      {
        title: "User Information",
        link: "/user/profile",
        icon: SettingsApplicationsIcon,
      },
      {
        title: "My Cart",
        link: "/user/cart",
        icon: ShoppingBasketOutlined,
      },
    ],
    public: true,
  },
  Admin: {
    items: [
      { title: "Site info", link: "/admin/site-info", icon: HttpIcon },
      {
        title: "Dashboard",
        link: "/admin/dashboard",
        icon: PostAddIcon,
      },
      {
        title: "Add products",
        link: "/admin/add-product",
        icon: PostAddIcon,
      },
      {
        title: "Manage categories",
        link: "/admin/categories",
        icon: PostAddIcon,
      },
      {
        title: "Manage Products",
        link: "/admin/products",
        icon: SupervisedUserCircleOutlined,
      },
      {
        title: "Manage users",
        link: "/admin/users",
        icon: SupervisedUserCircleOutlined,
      },

    ],
    public: false,
  },
};
console.log(links);
const UserLayout = ({ currentUser, children }) => {
  const classes = useStyles();

  const renderLinks = (links, section) => {
    return (
      <List>
        {links && links.items.map((item) => (
          <NavItem
            href={item.link}
            key={item.link}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </List>
    );
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.dashboardInner}
      >
        <Grid item xs={2}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.dashboardControll,
            }}
          >
            <List>
              {renderLinks(links["My account"], linksEnum["MY_ACCOUNT"])}
            </List>
            {currentUser.role !== Roles.Admin
              ? null
              : renderLinks(links["Admin"], linksEnum["ADMIN"])}
          </Drawer>
        </Grid>

        <Grid item xs={10} className={classes.pageContainer}>
          <div className={classes.pageContent}>{children}</div>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserLayout);
