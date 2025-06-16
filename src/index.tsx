import React from "react";
import ReactDOM from "react-dom/client";
import { App, ErrorBoundary } from "./components";
import "./index.css";
import "./variables.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
