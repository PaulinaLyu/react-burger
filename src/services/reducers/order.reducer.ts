import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createBurgerOrder } from "../actions/order-actions";
import { toast } from "react-toastify";
import { ERROR_PLACE_ORDER } from "../../contants";

export interface OrderState {
  orderNumber: number | null;
  isLoading: boolean;
}

const initialState: OrderState = {
  orderNumber: null,
  isLoading: false,
};

export const orderSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    resetOrder() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPending(createBurgerOrder), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isFulfilled(createBurgerOrder),
        (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.orderNumber = action.payload;
        }
      )
      .addMatcher(isRejected(createBurgerOrder), (state, action) => {
        state.isLoading = false;
        toast.error(`${ERROR_PLACE_ORDER}:  ${action.error.message}`);
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
