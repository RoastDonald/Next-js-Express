import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 200;

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#F3F3F3",
    minHeight: 80,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  burgerMenu: {
    position: "absolute",
    top: "25%",
    left: "8%",
  },
  filterBtn: {
    background: "#713BDB",
    borderRadius: 10,
    color: "#fff",
    textTransform: "capitalize",
    padding: "5px 25px",
    fontSize: 16,
    letterSpacing: 1,
    "&:hover": {
      backgroundColor: "#603ba8",
    },
  },
  logoContainer: {
    display: "flex",
    flex: "0 0 15%",
    minWidth: 270,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -16,
    backgroundColor: "white",
    [`${theme.breakpoints.between("xs", "sm")} `]: {
      width: "100%",
    },
  },

  toolbar: {
    minHeight: theme.customStyles.headerHeight,
    alignItems: "stretch",
    minHeight: 80,
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(2),

    width: "100%",
  },
  logoBox: {
    display: "flex",
    color: "#161616",
    textDecoration: "none",
    alignItems: "center",
    [`${theme.breakpoints.down("xs")} `]: {
      marginLeft: -32,
    },
  },
  menuContainer: {
    padding: 30,
    marginTop: "50px",
  },
  siteMeta: {
    display: "flex",
    width: "auto",
    [`${theme.breakpoints.down("xs")} `]: {
      width: "100%",
    },
  },
  logo: {
    width: 64,
    height: 64,
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: 800,
    marginLeft: 10,
  },
  searchBar: {
    padding: "0 30px",
    display: "flex",
    flex: "0 0 70%",
    alignItems: "center",
  },
  headerIcon: {
    position: "relative",
    width: 36,
    height: 36,
    color: "#000",
  },
  cartContainer: {
    minWidth: "300px",
  },
  headerNavList: {
    flex: "0 0 15%",
    "& > *:not(:last-child)": {
      marginRight: 20,
    },
  },
  cartLength: {
    color: "#fff",
    left: "5px",
    top: "28px",
    width: "20px",
    height: "20px",
    position: "absolute",
    fontSize: 12,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: theme.palette.secondary.light,
  },
  loginButton: {
    borderColor: "#fff",
    color: "#fff",
  },
}));
