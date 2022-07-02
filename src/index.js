import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { MeContextProvider } from "./context/MeContext";
import { AuthContextProvider } from "./context/AuthContext";
import Authentication from "./context/Authentication";
import "./i18n";
import * as serviceWorker from "./serviceWorker";

require("dotenv").config();

ReactDOM.render(
  <BrowserRouter>
    <MeContextProvider>
      <AuthContextProvider>
        <Authentication>
          <App />
        </Authentication>
      </AuthContextProvider>
    </MeContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
