import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIngredients } from "../../../api";
import { Ingredient } from "../../../models";

export const fetchBurgerIngredients = createAsyncThunk<Ingredient[]>(
  "data/fetchBurgerIngredients",
  async () => {
    return fetchIngredients();
  }
);
