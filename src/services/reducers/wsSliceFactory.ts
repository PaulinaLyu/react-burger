import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

interface WsState<TMessage> {
  connected: boolean;
  messages: TMessage | null;
  error: Event | null;
}

export interface WsInitPayload {
  withToken?: boolean;
}

export function createWsSlice<TMessage>(name: string) {
  const wsInit = createAction<WsInitPayload>(`${name}/init`);
  const wsEnd = createAction(`${name}/end`);

  type State = WsState<TMessage>;

  const initialState: State = {
    connected: false,
    messages: null,
    error: null,
  };

  const slice = createSlice({
    name,
    initialState: initialState,
    reducers: {
      onOpen: (state) => {
        state.connected = true;
        state.error = null;
      },
      onClose: (state) => {
        state.connected = false;
      },
      onError: (state, action: PayloadAction<Event>) => {
        state.error = action.payload;
      },
      onMessage: (state, action: PayloadAction<TMessage>) => {
        state.messages = action.payload as any;
      },
    },
  });

  return {
    reducer: slice.reducer,
    actions: {
      wsInit,
      wsEnd,
      onOpen: slice.actions.onOpen,
      onClose: slice.actions.onClose,
      onError: slice.actions.onError,
      onMessage: slice.actions.onMessage,
    },
  };
}
