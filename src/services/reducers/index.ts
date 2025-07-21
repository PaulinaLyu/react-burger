import { combineReducers } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./burger-ingredients.reducer";
import ingredientDetailsReducer from "./ingredient-details.reducer";
import burgerConstructorReducer from "./burger-constructor.reducer";
import orderReducer from "./order.reducer";
import authReducer from "./auth.reducer";

export type RootState = {
  burgerIngredients: ReturnType<typeof burgerIngredientsReducer>;
  ingredientDetails: ReturnType<typeof ingredientDetailsReducer>;
  burgerConstructor: ReturnType<typeof burgerConstructorReducer>;
  order: ReturnType<typeof orderReducer>;
  auth: ReturnType<typeof authReducer>;
};

type RootAction = PayloadAction<unknown>;

const reducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
});

export const rootReducer = (state: RootState | undefined, action: RootAction) =>
  reducer(state, action);
