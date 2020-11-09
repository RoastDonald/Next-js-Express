import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.customStyles.headerHeight + 60,
    width: "80%",
    margin: "0 auto",
  },
  filter: {
    color: "#fff",
    listStyle: "none",
    BorderBottom: "1px solid #fff",
  },
}));
