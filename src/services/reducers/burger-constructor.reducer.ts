import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient, IngredientWithUniqueId } from "../../models";
import uuid4 from "uuid4";

export interface BurgerConstructorState {
  bun: Ingredient | null;
  ingredients: IngredientWithUniqueId[];
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
    addIngredient: {
      reducer: (state, action: PayloadAction<IngredientWithUniqueId>) => {
        state.ingredients = [action.payload, ...state.ingredients];
      },
      prepare: (ingredient: Ingredient) => {
        return { payload: { ...ingredient, uniqueId: uuid4() } };
      },
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },
    swapIngredients(state, action: PayloadAction<[number, number]>) {
      const [dragIndex, hoverIndex] = action.payload;
      const draggedItem = state.ingredients[dragIndex];

      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
    resetConstructor() {
      return initialState;
    },
  },
});

export const {
  setBun,
  setTotalPrice,
  addIngredient,
  removeIngredient,
  swapIngredients,
  resetConstructor,
} = BurgerConstructorSlice.actions;

export default BurgerConstructorSlice.reducer;
