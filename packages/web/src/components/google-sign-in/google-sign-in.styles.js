import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "100%",
    textTransform: "capitalize",
    fontSize: 18,
    textAlign: "center",
    "& > span": {
      width: "75%",
    },
  },
}));
