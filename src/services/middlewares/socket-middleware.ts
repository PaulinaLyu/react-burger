import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import type { RootState } from "../reducers";
import {
  wsInit,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
  wsEnd,
} from "../reducers/ws.reducer";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;

      if (wsInit.match(action)) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = () => dispatch(wsOpen());
        socket.onerror = (event) => dispatch(wsError(event));
        socket.onmessage = (event) =>
          dispatch(wsMessage(JSON.parse(event.data)));
        socket.onclose = () => dispatch(wsClose());

        if (wsEnd.match(action)) {
          socket.close();
          dispatch(wsClose());
        }
      }

      return next(action);
    };
  }) as Middleware;
};
