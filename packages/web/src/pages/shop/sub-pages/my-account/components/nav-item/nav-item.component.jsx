import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Button, ListItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    position: 'relative',
    padding: 0,
    backgroundColor: '#fff',
    "&:hover": {
      "& $title": {
        textDecoration: 'underline'
      },
    },
    "&:not(:first-child)": {
      "&::after": {
        content: "''",
        borderTop: ' 1px solid #ddd',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 68
      }
    }

  },
  button: {
    color: theme.palette.text.secondary,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  spec: {
    marginTop: 5,
    color: theme.palette.text.secondary,

    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  title: {
    marginRight: "auto",
    fontSize: 16,
    color: "#3E3434",
  },
  active: {
    color: theme.palette.primary.main,
    borderRadius: 0,
    backgroundColor: '#f8f8f8',
    "& $title": {
      fontWeight: 'bold'
    },
    "&::after": {
      left: 0,
      content: "''",
      position: 'absolute',
      height: '100%',
      marginRight: 10,
      width: 3,
      backgroundColor: '#2d2d2d'
    },
    // "& $icon": {
    //   color: '#713BDB',
    // },
  },
}));

const NavItem = ({ className, href, isBtn, icon: Icon, title, ...rest }) => {
  const classes = useStyles();



  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={(!isBtn ? classes.active : null)}
        className={(!isBtn ? classes.button : classes.spec)}
        disableRipple={true}
        component={(props) => <NavLink end={true}  {...props} />}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
