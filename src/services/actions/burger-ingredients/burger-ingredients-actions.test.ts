import { fetchIngredients } from "../../../api";
import { Ingredient } from "../../../models";
import { fetchBurgerIngredients } from "./burger-ingredients-actions";

jest.mock("../../../api", () => ({
  fetchIngredients: jest.fn(),
}));

const mockedFetchIngredients = fetchIngredients as jest.MockedFunction<
  typeof fetchIngredients
>;

describe("burger-ingredients thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = undefined;

  const mockIngredients: Ingredient[] = [
    {
      _id: "1",
      name: "Булка",
      type: "bun",
      proteins: 80,
      fat: 40,
      carbohydrates: 100,
      calories: 300,
      price: 200,
      image: "image-url",
      image_mobile: "mobile-image-url",
      image_large: "large-image-url",
      __v: 0,
    },
    {
      _id: "2",
      name: "Котлета",
      type: "main",
      proteins: 50,
      fat: 30,
      carbohydrates: 20,
      calories: 250,
      price: 150,
      image: "image-url-2",
      image_mobile: "mobile-image-url-2",
      image_large: "large-image-url-2",
      __v: 0,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchBurgerIngredients", () => {
    it("должен вернуть массив ингредиентов при успешном вызове API", async () => {
      mockedFetchIngredients.mockResolvedValue(mockIngredients);

      const result = await fetchBurgerIngredients()(dispatch, getState, extra);

      expect(mockedFetchIngredients).toHaveBeenCalledTimes(1);
      expect(result.type).toBe("data/fetchBurgerIngredients/fulfilled");
      expect(result.payload).toEqual(mockIngredients);
    });

    it("должен вернуть rejected при ошибке API", async () => {
      (fetchIngredients as jest.Mock).mockRejectedValue(new Error("not found"));

      const thunk = fetchBurgerIngredients();
      const result = await thunk(dispatch, getState, extra);

      expect(result.type).toBe("data/fetchBurgerIngredients/rejected");
    });
  });
});
