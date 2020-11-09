import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(/images/login_bck.jpg)`,
    backgroundRepeat: "no-repeat",
    transition: "all 0.3s ease",
    backgroundSize: "cover",
    "& > .MuiGrid-item": {
      padding: 0,
    },
    minHeight: "100vh",
    [`${theme.breakpoints.down("sm")} `]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  text: {
    ...theme.typography.text,
  },
  loginImage: {
    background: `url(/images/login_image.jpg)`,
    backgroundSize: "cover",
    transition: "all 0.3s ease",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%",
  },
  loginBlock: {
    flexDirection: "column",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",

    marginTop: theme.customStyles.headerHeight + 40,
    // marginBottom: theme.customStyles.headerHeight + 40,
  },
  loginContainer: {
    borderRadius: "15px",
    backgroundColor: "aliceblue",
    padding: "25px 10px",
    width: "60%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [`${theme.breakpoints.between("xs", "sm")} `]: {
      width: "94% ",
      margin: "0 auto",
    },
    [`${theme.breakpoints.between("xs++", "sm")} `]: {
      width: "75% ",
      padding: "30px 15px",
    },
    [`${theme.breakpoints.up("sm")}`]: {
      width: "100% ",
      padding: "30px 15px",
    },

    [`${theme.breakpoints.up("md")} `]: {
      width: "60% ",
      padding: "30px 15px",
    },

    [`${theme.breakpoints.up("lg")} `]: {
      width: "50% ",
      padding: " 20px 10px",
    },

    [`${theme.breakpoints.up("xl")} `]: {
      fontSize: "20px",
      width: "35% ",
      padding: " 15px 10px",
    },
  },
}));
