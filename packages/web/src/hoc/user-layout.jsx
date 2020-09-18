import { Link } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    minHeight: "75vh",
    marginTop: "25vh",
  },
  dashboardInner: {
    width: "50%",
    height: "50%",
    [`${theme.breakpoints.down("sm")} `]: {
      width: "80%",
    },
    "& .MuiSvgIcon-root": {
      fill: "#4e4e4e",
    },
  },
}));

const links = [
  { name: "My account", link: "/user/dashboard" },
  { name: "User Information", link: "/user/profile" },
  { name: "My Cart", link: "/user/dashboard" },
];

const UserLayout = (props) => {
  const classes = useStyles();
  const renderedLinks = (links) =>
    links.map((item, idx) => (
      <Link href={item.link} key={idx}>
        {item.name}
      </Link>
    ));

  return (
    <Grid container className={classes.dashboardContainer} justify="center">
      <Grid
        container
        justify="space-between"
        className={classes.dashboardInner}
        spacing={4}
      >
        <Grid item xs={3}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={8}>
          <div className="user_right">{props.children}</div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserLayout;
