import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./services/store";
import { App, ErrorBoundary } from "./components";
import "./index.css";
import "./variables.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
