import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
  },
  iconButton: {
    padding: 6,
    borderRadius: 10,
    color: "beige",
    "&:hover": {
      backgroundColor: "grey",
    },
  },
  deleteIcon: {
    backgroundColor: "#DB4437",
    "&:hover": {
      backgroundColor: "#972a21",
    },
  },
  editIcon: {
    backgroundColor: "#5586d4",
    "&:hover": {
      backgroundColor: "#436caf",
    },
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchField: {
    color: "#fff ",
    fontSize: 14,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#4a4a4a",
  },
  tableContainer: {
    backgroundColor: "beige",
    fontSize: 18,
    "& .MuiTableRow-root": {
      borderBottom: "none",
    },
  },
  adminRoleText: {
    padding: "5px 8px",
    color: "#fff",
    borderRadius: 5,
    backgroundColor: " #db4437",
  },
  userRoleText: {
    padding: "5px 8px",
    color: "#fff",
    borderRadius: 5,
    backgroundColor: " #4285F4",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "center",
    "& > *:not(:last-child)": {
      marginRight: 10,
    },
  },
  searchWrapper: {
    position: "absolute",
    top: -50,
    right: 20,
  },
  editDialog: {
    display: "flex",
    alignItems: "center",
  },
  userEmailDialog: {
    margin: "0 10px",
    fontWeight: 800,
  },
}));
