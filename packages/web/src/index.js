import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import history from "./history";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import "./styles/globals.css";
import "./styles/main.css";
import "react-quill/dist/quill.snow.css";
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <App />
        </Router>{" "}
      </PersistGate>{" "}
    </Provider>{" "}
  </ThemeProvider>,
  document.getElementById("root")
);
