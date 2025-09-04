import burgerConstructorReducer, {
  BurgerConstructorState,
  setBun,
  setTotalPrice,
  removeIngredient,
  resetConstructor,
  swapIngredients,
} from "./burger-constructor.reducer";
import { Ingredient, IngredientWithUniqueId } from "../../../models";

describe("burgerConstructorSlice", () => {
  const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: [],
    totalPrice: 0,
  };

  const mockBun: Ingredient = {
    _id: "bun-1",
    name: "Test Bun",
    type: "bun",
    price: 100,
    image: "bun-image.jpg",
    calories: 200,
    proteins: 5,
    fat: 3,
    carbohydrates: 40,
    __v: 123,
    image_mobile: "bun-image-mobile.jpg",
    image_large: "bun-image-large.jpg",
  };

  const mockIngredient: Ingredient = {
    _id: "ingredient-1",
    name: "Test Ingredient",
    type: "main",
    price: 50,
    image: "ingredient-image.jpg",
    calories: 100,
    proteins: 10,
    fat: 5,
    carbohydrates: 2,
    __v: 1,
    image_mobile: "ingredient-image-mobile.jpg",
    image_large: "ingredient-image-large.jpg",
  };

  const mockIngredient2: Ingredient = {
    _id: "ingredient-2",
    name: "Test Ingredient 2",
    type: "sauce",
    price: 30,
    image: "ingredient2-image.jpg",
    calories: 80,
    proteins: 2,
    fat: 1,
    carbohydrates: 15,
    __v: 2,
    image_mobile: "ingredient-image-mobile.jpg",
    image_large: "ingredient-image-large.jpg",
  };

  it("должен вернуть исходное состояние", () => {
    expect(burgerConstructorReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("должен сбросить состояние до исходного", () => {
    const previousState: BurgerConstructorState = {
      bun: mockBun,
      ingredients: [{ ...mockIngredient, uniqueId: "uuid-1" }],
      totalPrice: 200,
    };

    expect(burgerConstructorReducer(previousState, resetConstructor())).toEqual(
      initialState
    );
  });

  describe("setBun", () => {
    it("должен устанавливать новое значение булки", () => {
      const action = setBun(mockBun);
      const state = burgerConstructorReducer(initialState, action);

      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toEqual([]);
      expect(state.totalPrice).toBe(0);
    });

    it("должен заменить существующую булочку на новую", () => {
      const newBun: Ingredient = {
        ...mockBun,
        _id: "bun-2",
        name: "New Bun",
        price: 120,
      };

      const stateWithBun = { ...initialState, bun: mockBun };
      const action = setBun(newBun);
      const state = burgerConstructorReducer(stateWithBun, action);

      expect(state.bun).toEqual(newBun);
      expect(state.bun?._id).toBe("bun-2");
    });
  });

  describe("setTotalPrice", () => {
    it("должен установить значение цены", () => {
      const action = setTotalPrice(250);
      const state = burgerConstructorReducer(initialState, action);

      expect(state.totalPrice).toBe(250);
    });

    it("должен заменить существующую цену на новую", () => {
      const stateWithPrice = { ...initialState, totalPrice: 100 };
      const action = setTotalPrice(300);
      const state = burgerConstructorReducer(stateWithPrice, action);

      expect(state.totalPrice).toBe(300);
    });
  });

  describe("removeIngredient", () => {
    it("должен удалить ингредиент по uniqueId", () => {
      const ingredients: IngredientWithUniqueId[] = [
        { ...mockIngredient, uniqueId: "uuid-1" },
        { ...mockIngredient2, uniqueId: "uuid-2" },
      ];

      const stateWithIngredients = { ...initialState, ingredients };
      const action = removeIngredient("uuid-1");
      const state = burgerConstructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].uniqueId).toBe("uuid-2");
    });

    it("не должен ничего удалять, если uniqueId не найден", () => {
      const ingredients: IngredientWithUniqueId[] = [
        { ...mockIngredient, uniqueId: "uuid-1" },
      ];

      const stateWithIngredients = { ...initialState, ingredients };
      const action = removeIngredient("non-existent-uuid");
      const state = burgerConstructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].uniqueId).toBe("uuid-1");
    });
  });

  describe("swapIngredients", () => {
    it("должен поменять местами ингредиенты", () => {
      const ingredients: IngredientWithUniqueId[] = [
        { ...mockIngredient, uniqueId: "uuid-1" },
        { ...mockIngredient2, uniqueId: "uuid-2" },
        { ...mockIngredient, uniqueId: "uuid-3" },
      ];

      const stateWithIngredients = { ...initialState, ingredients };
      const action = swapIngredients([0, 2]);
      const state = burgerConstructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(3);
      expect(state.ingredients[0].uniqueId).toBe("uuid-2");
      expect(state.ingredients[1].uniqueId).toBe("uuid-3");
      expect(state.ingredients[2].uniqueId).toBe("uuid-1");
    });

    it("должен обрабатывать обмен с тем же индексом и оставлять изначальное положение", () => {
      const ingredients: IngredientWithUniqueId[] = [
        { ...mockIngredient, uniqueId: "uuid-1" },
        { ...mockIngredient2, uniqueId: "uuid-2" },
      ];

      const stateWithIngredients = { ...initialState, ingredients };
      const action = swapIngredients([1, 1]);
      const state = burgerConstructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toEqual(ingredients);
    });
  });
});
