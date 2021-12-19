import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

const { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
