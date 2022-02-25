import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";
import "./index.css";
import store from "./store/index";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DataContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </DataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
