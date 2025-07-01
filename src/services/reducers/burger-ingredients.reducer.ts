import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchBurgerIngredients } from "../actions/burger-ingredients-actions";
import { Ingredient } from "../../models";
import { toast } from "react-toastify";
import { ERROR_LOADING_BURGER_INGREDIENTS } from "../../contants";

export interface BurgerIngredientsState {
  data: any;
  isLoading: boolean;
}

const initialState: BurgerIngredientsState = {
  data: [],
  isLoading: false,
};

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(isPending(fetchBurgerIngredients), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isFulfilled(fetchBurgerIngredients),
        (state, action: PayloadAction<Ingredient[]>) => {
          state.isLoading = false;

          state.data = action.payload;
        }
      )
      .addMatcher(isRejected(fetchBurgerIngredients), (state, action) => {
        state.isLoading = false;
        toast.error(
          `${ERROR_LOADING_BURGER_INGREDIENTS} ${action.error.message}`
        );
      });
  },
});

export default burgerIngredientsSlice.reducer;
