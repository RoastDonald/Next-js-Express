import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope,
} from "@fortawesome/fontawesome-free-solid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    color: "#d8d8d8",
    minHeight: "300px",
    backgroundColor: "#13140e",
    display: "flex",
  },
  footerInner: {
    padding: "25px",
    margin: "0 auto",
  },
  logo: {
    width: 64,
    height: 64,
  },
  logoBox: {
    display: "flex",
  },
  tagsContainer: {
    "& > .MuiGrid-item ": {
      margin: "10px 5px",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Grid container xs={8} className={classes.footerInner}>
        {/* <Grid item xs={12}>
          <Link href="/" underline="none" className={classes.logoBox}>
            <img src="/icons/logo.svg" className={classes.logo} />
            <h1>Waves</h1>
          </Link>
        </Grid> */}
        <Grid container xs={12}>
          <Grid item xs={6}>
            <h2>Contact information</h2>
            <Grid container xs={12} className={classes.tagsContainer}>
              <Grid item xs={5}>
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>Kramer 2345</div>
                </div>
              </Grid>
              <Grid item xs={5}>
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>2345-22222</div>
                </div>
              </Grid>
              <Grid item xs={5}>
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="nfo">
                  <div>Working hours</div>
                  <div>Mon-Sun/ 9am-8pm</div>
                </div>
              </Grid>
              <Grid item xs={5}>
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>nfo@waves.com</div>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={6}>
            <h2>Be the first to know</h2>
            <Typography variant="body1">
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
