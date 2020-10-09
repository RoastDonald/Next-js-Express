import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope,
} from "@fortawesome/fontawesome-free-solid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "auto",
    color: "#d8d8d8",
    backgroundColor: "#13140e",
    display: "flex",
    fontSize: 18,
    zIndex: 100,
  },
  footerPromo: {
    marginTop: 40,
  },
  footerText: {
    width: "70%",
    margin: "0 auto",

    [`${theme.breakpoints.up("sm")} `]: {
      textAlign: "left ",
      margin: 0,
    },

    [`${theme.breakpoints.between("xs", "sm")} `]: {
      margin: "0 auto",
    },
  },
  tagsTitle: {
    textAlign: "center",
    marginBottom: 30,
  },
  footerInner: {
    padding: "25px",
    margin: "0 auto",

    [`${theme.breakpoints.between("xs", "sm")} `]: {
      textAlign: "center ",
    },
  },
  tag: {
    "& > *:not(:last-child)": {
      margin: "5px",
    },
  },
  logo: {
    width: 64,
    height: 64,
  },
  logoBox: {
    display: "flex",
  },
  tagsContainer: {
    [`${theme.breakpoints.between("xs++", "sm")} `]: {
      width: "70% ",
      margin: "0 auto",
    },
    [`${theme.breakpoints.up("sm")} `]: {
      marginLeft: "auto",
      marginRight: 50,
      width: "80% ",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  if (pathname.startsWith("/user") || pathname.startsWith("/admin"))
    return null;
  return (
    <footer className={classes.footer}>
      <Grid container className={classes.footerInner}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Typography variant="h1" className={classes.tagsTitle}>
              Contact information
            </Typography>
            <Grid container className={classes.tagsContainer}>
              <Grid item xs={6} sm={3} md={6} lg={3}>
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className={classes.tag}>
                  <div>Address</div>
                  <div>Kramer 2345</div>
                </div>
              </Grid>
              <Grid item xs={6} sm={3} md={6} lg={3}>
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className={classes.tag}>
                  <div>Phone</div>
                  <div>2345-22222</div>
                </div>
              </Grid>
              <Grid item xs={6} sm={3} md={6} lg={3}>
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className={classes.tag}>
                  <div>Working hours</div>
                  <div>Mon-Sun/ 9am-8pm</div>
                </div>
              </Grid>
              <Grid item xs={6} sm={3} md={6} lg={3}>
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className={classes.tag}>
                  <div>Email</div>
                  <div>nfo@waves.com</div>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4} className={classes.footerPromo}>
            <Typography variant="h1">Be the first to know</Typography>
            <Typography variant="body1" className={classes.footerText}>
              Get all the latest information on events, sales and offers.You can
              miss out.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
