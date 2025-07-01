import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BurgerIngredientsState {
  ingredientsList: number;
}

const initialState: BurgerIngredientsState = {
  ingredientsList: 0,
};

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
});

export const {} = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
