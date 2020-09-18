import { createMuiTheme } from "@material-ui/core/styles";

const purpleLight = "#011d3a";
const purpleDark = "#F20775";
const blueLight = "#7fffd4";
const grey = "#f2f2f2";
const white = "#fff";
export default createMuiTheme({
  palette: {
    common: {
      purple: purpleDark,
      blue: blueLight,
      grey: grey,
    },
    primary: {
      main: blueLight,
    },
    secondary: {
      main: purpleLight,
    },
    white: {
      main: white,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem",
    },

    h1: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#fff",
      lineHeight: 1.5,
    },
    text: {
      letterSpacing: "1px",
      fontSize: 16,
      lineHeight: 1.5,
    },
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "0",
      },
    },
    MuiSvgIcon: {
      root: {
        fill: "#fff",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#161616",
        color: blueLight,
      },
    },
  },
  customStyles: {
    headerHeight: 50,
  },
});
