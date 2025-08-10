import {
  DOMAIN,
  LOGIN_API,
  RESET_PASSWORD_API,
  REGISTER_API,
  TOKEN_API,
  LOGOUT_API,
  USER_API,
  FINAL_RESET_PASSWORD_API,
} from "./constants";
import { request, requestWithRefresh, getCookie } from "../utils";
import {
  ApiResponseWithoutData,
  AuthResponse,
  IApprovedResetPasswordForm,
  ILoginForm,
  InfoResponse,
} from "../types";
import { User } from "../models";

export const refreshToken = (): Promise<ApiResponseWithoutData> => {
  return request<ApiResponseWithoutData>(`${DOMAIN}${TOKEN_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const logoutUser = (): Promise<InfoResponse> => {
  return request<InfoResponse>(`${DOMAIN}${LOGOUT_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const loginUser = (user: ILoginForm): Promise<AuthResponse> => {
  return request<AuthResponse>(`${DOMAIN}${LOGIN_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...user }),
  });
};

export const registerUser = (user: User): Promise<AuthResponse> => {
  return request<AuthResponse>(`${DOMAIN}${REGISTER_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...user }),
  });
};

export const resetPassword = (form: {
  email: string;
}): Promise<InfoResponse> => {
  return request<InfoResponse>(`${DOMAIN}${RESET_PASSWORD_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...form }),
  });
};

export const approvedResetPassword = (
  form: IApprovedResetPasswordForm
): Promise<InfoResponse> => {
  return request<InfoResponse>(`${DOMAIN}${FINAL_RESET_PASSWORD_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...form }),
  });
};

export const getUser = (): Promise<AuthResponse> => {
  return requestWithRefresh<AuthResponse>(`${DOMAIN}${USER_API}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
};

export const updateUser = (user: User): Promise<AuthResponse> => {
  return requestWithRefresh<AuthResponse>(`${DOMAIN}${USER_API}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ...user }),
  });
};
