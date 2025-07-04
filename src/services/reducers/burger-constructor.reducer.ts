import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../models";

export interface BurgerConstructorState {
  bun: Ingredient | null;
  ingredients: Ingredient[];
  totalPrice: number;
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
};

export const BurgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<Ingredient>) {
      state.bun = action.payload;
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
    addIngredient(state, action: PayloadAction<Ingredient>) {
      state.ingredients = [action.payload, ...state.ingredients];
    },
    removeIngredient(state, action: PayloadAction<string>) {
      debugger;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    swapIngredients(state, action: PayloadAction<[number, number]>) {
      const newIngredients = [...state.ingredients];
      [newIngredients[action.payload[0]], newIngredients[action.payload[1]]] = [
        newIngredients[action.payload[1]],
        newIngredients[action.payload[0]],
      ];
      state.ingredients = newIngredients;
    },
  },
});

export const {
  setBun,
  setTotalPrice,
  addIngredient,
  removeIngredient,
  swapIngredients,
} = BurgerConstructorSlice.actions;

export default BurgerConstructorSlice.reducer;
