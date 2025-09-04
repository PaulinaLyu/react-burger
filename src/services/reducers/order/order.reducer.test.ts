import { toast } from "react-toastify";
import { createBurgerOrder } from "../../actions";
import { OrderState, resetOrder } from "./order.reducer";
import orderReducer from "./order.reducer";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("orderSlice", () => {
  const initialState: OrderState = {
    orderNumber: null,
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должен вернуть исходное состояние", () => {
    expect(orderReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен сбросить состояние до исходного", () => {
    const previousState: OrderState = {
      orderNumber: 12345,
      isLoading: true,
    };

    expect(orderReducer(previousState, resetOrder())).toEqual(initialState);
  });

  describe("createBurgerOrder async thunk", () => {
    it("должен обрабатывать состояние ожидания", () => {
      const action = createBurgerOrder.pending("", ["id1", "id2"]);
      const state = orderReducer(initialState, action);

      expect(state).toEqual({
        orderNumber: null,
        isLoading: true,
      });
    });

    it("должен обрабатывать выполненное состояние", () => {
      const orderNumber = 12345;
      const action = createBurgerOrder.fulfilled(orderNumber, "", [
        "id1",
        "id2",
      ]);
      const state = orderReducer(initialState, action);

      expect(state).toEqual({
        orderNumber: 12345,
        isLoading: false,
      });
    });

    it("должен обрабатывать отклоненное состояние", () => {
      const errorMessage = "Network error";
      const action = createBurgerOrder.rejected(new Error(errorMessage), "", [
        "id1",
        "id2",
      ]);
      const state = orderReducer({ ...initialState, isLoading: true }, action);

      expect(state).toEqual({
        orderNumber: null,
        isLoading: false,
      });

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining(errorMessage)
      );
    });
  });
});
