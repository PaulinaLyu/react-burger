import {
  DOMAIN,
  LOGIN_API,
  RESET_PASSWORD_API,
  REGISTER_API,
  TOKEN_API,
  LOGOUT_API,
  USER_API,
} from "./constants";
import { request, requestWithRefresh, getCookie } from "../utils";

export const refreshToken = () => {
  return request(`${DOMAIN}${TOKEN_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const logoutUser = () => {
  return request(`${DOMAIN}${LOGOUT_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const loginUser = (user) => {
  return request(`${DOMAIN}${LOGIN_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...user }),
  });
};

export const registerUser = (user) => {
  return request(`${DOMAIN}${REGISTER_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...user }),
  });
};

export const resetPassword = (form) => {
  return request(`${DOMAIN}${RESET_PASSWORD_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...form }),
  });
};

export const getUser = () => {
  return requestWithRefresh(`${DOMAIN}${USER_API}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
};

export const updateUser = (user) => {
  return requestWithRefresh(`${DOMAIN}${USER_API}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ...user }),
  });
};
