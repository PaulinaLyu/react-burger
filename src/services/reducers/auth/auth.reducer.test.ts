import { toast } from "react-toastify";
import authReducer, { AuthState } from "./auth.reducer";
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  updateUserThunk,
  getUserThunk,
  approvedResetPasswordThunk,
  // getUserThunk,
  // approvedResetPasswordThunk,
} from "../../actions/auth/auth-actions";
import {
  AuthResponse,
  IApprovedResetPasswordForm,
  ILoginForm,
  InfoResponse,
  IProfileEditForm,
  IRegisterForm,
} from "../../../types";

const mockNewUser = {
  email: "test@gmail.com",
  password: "12345",
  name: "John",
};

const mockProfileForm: IProfileEditForm = mockNewUser;

const mockRegisterForm: IRegisterForm = mockNewUser;

const mockLoginForm: ILoginForm = {
  email: mockNewUser.email,
  password: mockNewUser.password,
};

const mockAuthResponse: AuthResponse = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  success: true,
  user: {
    email: mockRegisterForm.email,
    name: mockRegisterForm.name,
  },
};

const mockInfoResponse: InfoResponse = {
  success: true,
  message: "message",
};

const mockApprovedResetPassForm: IApprovedResetPasswordForm = {
  password: "123456",
  token: "token",
};

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const initialState: AuthState = {
  isLoading: false,
};

describe("registerUserThunk async thunk", () => {
  it("должен обрабатывать состояние ожидания", () => {
    const action = registerUserThunk.pending(
      "",
      mockRegisterForm,
      mockAuthResponse
    );

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it("должен обрабатывать выполненное состояние", () => {
    const action = registerUserThunk.fulfilled(
      mockAuthResponse,
      "",
      mockRegisterForm
    );

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  it("должен обрабатывать отклоненное состояние", () => {
    const errorMessage = "Network error";
    const action = registerUserThunk.rejected(
      new Error(errorMessage),
      "",
      mockRegisterForm
    );
    const state = authReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage)
    );
  });
});

describe("loginUserThunk async thunk", () => {
  it("должен обрабатывать состояние ожидания", () => {
    const action = loginUserThunk.pending("", mockLoginForm, mockAuthResponse);

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it("должен обрабатывать выполненное состояние", () => {
    const action = loginUserThunk.fulfilled(
      mockAuthResponse,
      "",
      mockLoginForm
    );

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  it("должен обрабатывать отклоненное состояние", () => {
    const errorMessage = "Network error";
    const action = loginUserThunk.rejected(
      new Error(errorMessage),
      "",
      mockLoginForm
    );
    const state = authReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage)
    );
  });
});

describe("logoutUserThunk async thunk", () => {
  it("должен обрабатывать состояние ожидания", () => {
    const action = logoutUserThunk.pending("");

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it("должен обрабатывать выполненное состояние", () => {
    const action = logoutUserThunk.fulfilled(mockInfoResponse, "");

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  it("должен обрабатывать отклоненное состояние", () => {
    const errorMessage = "Network error";
    const action = logoutUserThunk.rejected(new Error(errorMessage), "");
    const state = authReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage)
    );
  });
});

describe("updateUserThunk async thunk", () => {
  it("должен обрабатывать состояние ожидания", () => {
    const action = updateUserThunk.pending(
      "",
      mockProfileForm,
      mockAuthResponse
    );

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it("должен обрабатывать выполненное состояние", () => {
    const action = updateUserThunk.fulfilled(
      mockAuthResponse,
      "",
      mockProfileForm
    );

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  it("должен обрабатывать отклоненное состояние", () => {
    const errorMessage = "Network error";
    const action = updateUserThunk.rejected(
      new Error(errorMessage),
      "",
      mockProfileForm
    );
    const state = authReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage)
    );
  });
});

describe("getUserThunk async thunk", () => {
  it("должен обрабатывать отклоненное состояние", () => {
    const errorMessage = "Network error";
    const action = getUserThunk.rejected(new Error(errorMessage), "");
    authReducer({ ...initialState, isLoading: true }, action);

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage)
    );
  });
});

describe("approvedResetPasswordThunk async thunk", () => {
  it("должен обрабатывать отклоненное состояние", () => {
    const errorMessage = "Network error";
    const action = approvedResetPasswordThunk.rejected(
      new Error(errorMessage),
      "",
      mockApprovedResetPassForm
    );
    authReducer({ ...initialState, isLoading: true }, action);

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage)
    );
  });
});
