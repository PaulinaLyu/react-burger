import { combineReducers } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./burger-ingredients.reducer";
import ingredientDetailsReducer from "./ingredient-details.reducer";

export type RootState = {
  burgerIngredients: ReturnType<typeof burgerIngredientsReducer>;
  ingredientDetails: ReturnType<typeof ingredientDetailsReducer>;
};

type RootAction = PayloadAction<unknown>;

const reducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
});

export const rootReducer = (state: RootState | undefined, action: RootAction) =>
  reducer(state, action);
