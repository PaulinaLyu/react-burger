import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import { FeedItem } from "../../../models";
import { getOrderById } from "../../actions";
import { toast } from "react-toastify";
import { ERROR_CURRENT_ORDER } from "../../../contants";

export interface CurrentOrderState {
  currentOrder: FeedItem | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CurrentOrderState = {
  currentOrder: null,
  isLoading: false,
  error: null,
};

export const CurrentOrderSlice = createSlice({
  name: "currentOrder",
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<FeedItem>) {
      state.currentOrder = action.payload;
    },
    resetCurrentOrder() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getOrderById), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        isFulfilled(getOrderById),
        (state, action: PayloadAction<FeedItem>) => {
          state.currentOrder = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(isRejected(getOrderById), (state, action) => {
        state.isLoading = false;
        toast.error(`${ERROR_CURRENT_ORDER} ${action.error.message}`);
      });
  },
});

export const { resetCurrentOrder, setCurrentOrder } = CurrentOrderSlice.actions;

export default CurrentOrderSlice.reducer;
