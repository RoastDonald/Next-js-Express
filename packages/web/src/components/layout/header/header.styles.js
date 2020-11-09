import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 200;

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "rgb(173,165,165)",
    background:
      "linear-gradient(0deg, rgba(173,165,165,0) 0%, rgba(0,0,0,0.6931723372942927) 100%)",
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
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -16,

    [`${theme.breakpoints.between("xs", "sm")} `]: {
      width: "100%",
    },
  },

  toolbar: {
    minHeight: theme.customStyles.headerHeight,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),

    width: "100%",
  },
  logoBox: {
    display: "flex",
    color: "#fff",
    textDecoration: "none",

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
    marginLeft: 16,
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
    fontWeight: 800,
    marginLeft: 10,
  },
  headerIcon: {
    position: "relative",
    width: 36,
    height: 36,
    color: "#fff",
  },
  cartContainer: {
    minWidth: "300px",
  },
  headerNavList: {
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
