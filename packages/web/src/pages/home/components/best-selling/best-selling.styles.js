import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  cardsContainer: {
    position: "relative",
    margin: "0 auto",

    [`${theme.breakpoints.between("xs", "sm")} `]: {
      width: "90% ",
    },
    [`${theme.breakpoints.between("xs++", "sm")} `]: {
      width: "70% ",
    },
    [`${theme.breakpoints.up("sm")}`]: {
      width: "90%",
    },
  },
  title: {
    position: "absolute",
    top: "75%",
    fontWeight: 400,
    color: "#000",
    padding: "5px 15px",
    backgroundColor: "#ffff",
    borderRadius: 20,
    left: "50%",
    transform: "translateX(-50%)",
  },
  sectionContainer: {
    textAlign: "center",
    marginTop: 40,
    paddingBottom: 40,
  },

  cardCta: {
    backgroundColor: "#7a5a43",
    textAlign: "center",
  },
  titleContainer: {
    position: "relative",
    textAlign: "center",
    paddingTop: 20,
  },
  productInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid rgba(255,255,255,.5)",
    margin: "5px 0",
    "& > *:nth-child(1)": {
      fontSize: 16,
    },
    "& > *:nth-child(2)": {
      fontSize: 14,
      fontWeight: 800,
    },
  },
  productInfo: {
    position: "absolute",
    left: "50%",
    top: "75%",
    width: "90%",
    transform: "translate(-50%, 50%)",
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-between",

    "& > *:first-child": {
      backgroundColor: theme.palette.common.white,
      flex: "0 0 70%",
    },

    "& > *:last-child": {
      backgroundColor: theme.palette.common.white,
      flex: "0 0 15%",
    },

    "& > *": {
      width: "100%",
      borderRadius: 20,
    },
  },
  titleImage: {
    width: 128,
    height: 128,
  },
  productName: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    left: "50%",
    top: "60%",
    color: theme.palette.common.white,
    width: "70%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,

    "& > *:not(:last-child)": {
      padding: 10,
      borderRadius: 15,
      borderBottomRightRadius: 0,
      backgroundColor: theme.palette.common.white,
      borderTopRightRadius: 0,
      color: "cornflowerblue",
      fontWeight: "800",
    },

    "& > *:last-child": {
      fontSize: 14,
      width: "100%",
      textAlign: "center",
    },
  },

  cardOutter: {
    position: "relative",
  },
}));
