import currentOrderReducer, {
  CurrentOrderState,
  resetCurrentOrder,
  setCurrentOrder,
} from "./current-order.reducer";
import { getOrderById } from "../../actions";
import { FeedItem } from "../../../models";
import { ERROR_CURRENT_ORDER } from "../../../contants";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("currentOrderSlice", () => {
  const initialState: CurrentOrderState = {
    currentOrder: null,
    isLoading: false,
    error: null,
  };

  const mockOrder: FeedItem = {
    _id: "1",
    ingredients: ["ingredient1", "ingredient2"],
    status: "done",
    name: "Test Order",
    number: 123,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должен вернуть исходное состояние", () => {
    expect(currentOrderReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("должен сбросить состояние до исходного", () => {
    const previousState: CurrentOrderState = {
      currentOrder: mockOrder,
      isLoading: true,
      error: "Some error",
    };

    expect(currentOrderReducer(previousState, resetCurrentOrder())).toEqual(
      initialState
    );
  });

  it("должен устанавливать значение текущего заказа", () => {
    const action = setCurrentOrder(mockOrder);
    const state = currentOrderReducer(initialState, action);

    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  describe("getOrderById async thunk", () => {
    it("должен обрабатывать состояние ожидания", () => {
      const action = getOrderById.pending("", mockOrder._id);
      const state = currentOrderReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("должен обрабатывать выполненное состояние", () => {
      const action = getOrderById.fulfilled(mockOrder, "", mockOrder._id);

      const pendingState: CurrentOrderState = {
        ...initialState,
        isLoading: true,
      };

      const state = currentOrderReducer(pendingState, action);

      expect(state.currentOrder).toEqual(mockOrder);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it("должен обрабатывать отклоненное состояние", () => {
      const errorMessage = "Network error";
      const action = getOrderById.rejected(
        new Error(errorMessage),
        "",
        mockOrder._id
      );

      const pendingState: CurrentOrderState = {
        ...initialState,
        isLoading: true,
      };

      const state = currentOrderReducer(pendingState, action);

      expect(state.isLoading).toBe(false);

      expect(require("react-toastify").toast.error).toHaveBeenCalledWith(
        `${ERROR_CURRENT_ORDER} ${errorMessage}`
      );
    });
  });
});
