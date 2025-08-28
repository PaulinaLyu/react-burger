import { createOrder } from "../../../api";
import { fetchOrderById } from "../../../api/order";
import { FeedItem } from "../../../models";
import { createBurgerOrder, getOrderById } from "./order-actions";

jest.mock("../../../api", () => ({
  createOrder: jest.fn(),
}));

jest.mock("../../../api/order", () => ({
  fetchOrderById: jest.fn(),
}));

describe("order thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createBurgerOrder", () => {
    it("должен вернуть номер заказа при успешном создании", async () => {
      (createOrder as jest.Mock).mockResolvedValue(12345);

      const thunk = createBurgerOrder(["id1", "id2"]);
      const result = await thunk(dispatch, getState, extra);

      expect(createOrder).toHaveBeenCalledWith(["id1", "id2"]);
      expect(result.type).toBe("data/createOrder/fulfilled");
      expect(result.payload).toBe(12345);
    });

    it("должен вернуть rejected при ошибке", async () => {
      (createOrder as jest.Mock).mockRejectedValue(new Error("fail"));

      const thunk = createBurgerOrder(["id1"]);
      const result = await thunk(dispatch, getState, extra);

      expect(result.type).toBe("data/createOrder/rejected");
    });
  });

  describe("getOrderById", () => {
    it("должен вернуть FeedItem при успешном запросе", async () => {
      const mockFeedItem: FeedItem = {
        _id: "1",
        name: "Test Burger",
        status: "done",
        ingredients: ["id1", "id2"],
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        number: 111,
      };

      (fetchOrderById as jest.Mock).mockResolvedValue(mockFeedItem);

      const thunk = getOrderById("1");
      const result = await thunk(dispatch, getState, extra);

      expect(fetchOrderById).toHaveBeenCalledWith("1");
      expect(result.type).toBe("data/getOrderById/fulfilled");
      expect(result.payload).toEqual(mockFeedItem);
    });

    it("должен вернуть rejected при ошибке", async () => {
      (fetchOrderById as jest.Mock).mockRejectedValue(new Error("not found"));

      const thunk = getOrderById("2");
      const result = await thunk(dispatch, getState, extra);

      expect(result.type).toBe("data/getOrderById/rejected");
    });
  });
});
