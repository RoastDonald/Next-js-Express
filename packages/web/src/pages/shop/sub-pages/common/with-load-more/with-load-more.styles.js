import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  btnRoot: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  loadMoreBtn: {
    textTransform: "capitalize",
    width: "200px",
    height: "48px",
    backgroundColor: "hsla(0,0%,100%,.1)",
    color: "hsla(0,0%,100%,.4)",
    fontSize: "14px",
    lineHeight: "normal",
    fontWeight: 400,
    borderRadius: "10px",
    border: "none",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    outline: "none",
    alignItems: "center",

    "&:hover": {
      backgroundColor: "#161616",
    },
  },
}));
