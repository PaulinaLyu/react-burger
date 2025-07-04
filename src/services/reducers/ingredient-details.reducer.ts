import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../models";

export interface IngredientDetailsState {
  currentIngredient: Ingredient | null;
}

const initialState: IngredientDetailsState = {
  currentIngredient: null,
};

export const IngredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setCurrentIngredient(state, action: PayloadAction<Ingredient>) {
      state.currentIngredient = action.payload;
    },

    resetCurrentIngredient(state) {
      state.currentIngredient = initialState.currentIngredient;
    },
  },
});

export const { setCurrentIngredient, resetCurrentIngredient } =
  IngredientDetailsSlice.actions;

export default IngredientDetailsSlice.reducer;
