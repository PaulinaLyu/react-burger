import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middlewares/socket-middleware";
import { feedWs, profileWs } from "./wsSlices";
import { IOrdersFeed } from "../models";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware<IOrdersFeed>(
        "wss://norma.nomoreparties.space/orders/all",
        feedWs.actions
      ),
      socketMiddleware<IOrdersFeed>(
        "wss://norma.nomoreparties.space/orders",
        profileWs.actions
      )
    ),
});

export type AppDispatch = typeof store.dispatch;
