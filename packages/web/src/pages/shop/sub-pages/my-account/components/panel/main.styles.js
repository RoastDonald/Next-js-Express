export const useStyles = makeStyles((theme) => ({
  pageContent: {
    flex: "100%",
  },
  iconWrapper: {
    color: "orange",
  },
  dashboardControll: {
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 255,
  },
  pageContainer: {
    backgroundColor: "#191919",
    borderRadius: 15,
    marginTop: 120,
    marginLeft: "20%",
  },
  dashboardControllIcon: {
    "& .MuiSvgIcon-root": {
      fill: "#000",
    },
  },
  breadcrumbs: {
    position: "absolute",
    top: -50,
    left: 0,
  },
  root: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  dashboardInner: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    marginBottom: 50,
  },
  active: {
    backgroundColor: "#fff",
    color: "#000",
  },
  navList: {
    backgroundColor: "#fff",
    marginTop: 30,
    borderRadius: 10,
  },
  sectionTilte: {
    marginTop: 20,
  },
  drawerWrapper: {
    zIndex: 100,
  },

  btn: {
    textTransform: "capitalize",
    background: "#713BDB",
    borderRadius: 10,
    color: "#fff",
    padding: "5px 25px",
    fontSize: 16,
    letterSpacing: 1,
    "&:hover": {
      backgroundColor: "#603ba8",
    },
    minWidth: 160,
    minHeight: 40,
  },
}));
