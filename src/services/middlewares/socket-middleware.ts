import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import type { RootState } from "../reducers";
import { getCookie, setCookie } from "../../utils";
import { WsInitPayload } from "../reducers/wsSliceFactory";
import { refreshToken } from "../../api/auth";

interface WsActions<MessageType = unknown, ErrorType = Event> {
  wsInit: ActionCreatorWithPayload<WsInitPayload>;
  wsEnd: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<ErrorType>;
  onMessage: ActionCreatorWithPayload<MessageType>;
}

export const socketMiddleware = <MessageType = unknown>(
  wsUrl: string,
  actions: WsActions<MessageType>
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let lastPayload: WsInitPayload | null = null;

    return (next) => (action) => {
      const { dispatch } = store;

      if (actions.wsInit.match(action)) {
        const { withToken } = action.payload;
        lastPayload = action.payload;

        const fullUrl = withToken
          ? `${wsUrl}?token=${getCookie("accessToken")}`
          : wsUrl;

        socket = new WebSocket(fullUrl);
      }

      if (socket) {
        socket.onopen = () => dispatch(actions.onOpen());
        socket.onerror = (event) => dispatch(actions.onError(event));
        socket.onmessage = (event) =>
          dispatch(actions.onMessage(JSON.parse(event.data)));
        socket.onclose = async (event) => {
          if (event.code === 1006) {
            try {
              const refreshData = await refreshToken();

              if (!refreshData.success) {
                return Promise.reject(refreshData);
              }

              refreshData.refreshToken &&
                localStorage.setItem("refreshToken", refreshData.refreshToken);

              if (refreshData.accessToken) {
                setCookie("accessToken", refreshData.accessToken);
              }

              if (lastPayload) {
                dispatch(
                  actions.wsInit({
                    ...lastPayload,
                  })
                );
              }
            } catch (err) {
              console.error("Ошибка refresh, авторизуйтесь заново");
            }
          } else {
            dispatch(actions.onClose());
          }
        };

        if (actions.wsEnd.match(action)) {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
            dispatch(actions.onClose());
          }
        }
      }

      return next(action);
    };
  }) as Middleware;
};
