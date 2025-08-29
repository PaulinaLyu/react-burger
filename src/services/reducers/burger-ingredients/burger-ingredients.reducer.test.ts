import burgerIngredientsReducer, {
  BurgerIngredientsState,
} from "./burger-ingredients.reducer";
import { Ingredient } from "../../../models";
import { fetchBurgerIngredients } from "../../actions";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("burgerIngredientsSlice", () => {
  const initialState: BurgerIngredientsState = {
    data: [],
    isLoading: false,
  };

  const mockIngredients: Ingredient[] = [
    {
      _id: "1",
      name: "Булка",
      type: "bun",
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: "image1.jpg",
      image_mobile: "image1-mobile.jpg",
      image_large: "image1-large.jpg",
      __v: 0,
    },
    {
      _id: "2",
      name: "Котлета",
      type: "main",
      proteins: 15,
      fat: 8,
      carbohydrates: 2,
      calories: 120,
      price: 70,
      image: "image2.jpg",
      image_mobile: "image2-mobile.jpg",
      image_large: "image2-large.jpg",
      __v: 0,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должен вернуть исходное состояние", () => {
    expect(burgerIngredientsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  describe("fetchBurgerIngredients async thunk", () => {
    it("должен обрабатывать состояние ожидания", () => {
      const action = fetchBurgerIngredients.pending("");

      const state = burgerIngredientsReducer(initialState, action);

      expect(state).toEqual({
        data: [],
        isLoading: true,
      });
    });

    it("должен обрабатывать выполненное состояние", () => {
      const action = fetchBurgerIngredients.fulfilled(mockIngredients, "");
      const state = burgerIngredientsReducer(initialState, action);
      expect(state.data).toEqual(mockIngredients);
      expect(state.isLoading).toBe(false);
    });

    it("должен обрабатывать отклоненное состояние", () => {
      const errorMessage = "Network error";
      const action = fetchBurgerIngredients.rejected(
        new Error(errorMessage),
        ""
      );
      const state = burgerIngredientsReducer(
        { ...initialState, isLoading: true },
        action
      );

      expect(state).toEqual({
        data: [],
        isLoading: false,
      });

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining(errorMessage)
      );
    });
  });
});
