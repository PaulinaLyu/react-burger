import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { IOrdersFeed } from "../../models";

export const wsInit = createAction("ws/init");
export const wsEnd = createAction("ws/end");

interface WsState {
  connected: boolean;
  messages: IOrdersFeed | null;
  error: Event | null;
}

const initialState: WsState = {
  connected: false,
  messages: null,
  error: null,
};

const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    wsOpen: (state) => {
      state.connected = true;
      state.error = null;
    },
    wsClose: (state) => {
      state.connected = false;
    },
    wsError: (state, action: PayloadAction<Event>) => {
      state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<IOrdersFeed>) => {
      state.messages = action.payload;
    },
  },
});

export const { wsOpen, wsClose, wsError, wsMessage } = wsSlice.actions;
export default wsSlice.reducer;
