import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { App, ErrorBoundary } from "./components";
import "./styles/index.css";
import "./styles/variables.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter basename="/react-burger">
            <App />
          </BrowserRouter>
        </DndProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
