import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { Button, ListItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    color: "#fff",
    position:'relative'
  },
  button: {
    color: theme.palette.text.secondary,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
    fontSize: 16,
    color: "#fff",
  },
  active: {
    backgroundColor: "#2c2c2c",
    color: theme.palette.primary.main,
    borderRadius:0,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&::after":{
      left:0,
      content:"''",
      position:'absolute',
      height:'100%',
      width:5,
      backgroundColor:'#fff'
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const NavItem = ({ className, href, icon: Icon, title, ...rest }) => {
  const classes = useStyles();
  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
