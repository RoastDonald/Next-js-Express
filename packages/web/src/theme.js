import {
  createMuiTheme
} from "@material-ui/core/styles";

const purpleLight = "#011d3a";
const purpleDark = "#F20775";
const blueLight = "#7fffd4";
const grey = "#f2f2f2";
const white = "#e1e1e1";
export default createMuiTheme({
  palette: {
    common: {
      purple: purpleDark,
      blue: blueLight,
      grey: grey,
      white: white
    },
    primary: {
      main: blueLight,
    },
    secondary: {
      main: purpleLight,
    },
    icon_v1: {
      main: 'tomato'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      "xs+": 300,
      "xs++": 500,
      sm: 600,
      "sm+": 780,
      md: 960,
      lg: 1280,
      xl: 1920,
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

    price: {
      fontWeight: 800,
    },

    h1: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "1.5rem",
      color: "#fff",
      lineHeight: 1.5,
    },
    h2: {
      fontFamily: "Raleway",
      fontWeight: 400,
      fontSize: "1rem",
      color: "inherit",
      lineHeight: 1.2,
    },
    text: {
      letterSpacing: "1px",
      fontSize: 16,
      lineHeight: 1.5,
    },
    body4: {
      fontSize: 16,
      fontWight: 600
    }
  },
  overrides: {
    MuiGrid: {
      item: {
        position: 'relative'
      }
    },
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