import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px dashed #4d4d4d",
    padding: 12,
    borderRadius: 10,
    flexWrap: "wrap",
    display: "flex",
    flexwrap: "wrap",
    alignContent: "space-between",
  },
  dropzone: {
    outline: "none",
    margin: 12,
    borderRadius: 15,
    width: 180,
    height: 180,
    backgroundColor: " rgb(52, 52, 52,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropIcon: {
    fontSize: "2.7rem",
  },
}));
