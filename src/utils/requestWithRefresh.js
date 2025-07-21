import { checkResponse } from "./checkResponse";
import { request } from "./request";
import { setCookie } from "./cookies";
import { refreshToken } from "../api/auth";

export const requestWithRefresh = (url, options) => {
  return fetch(url, options)
    .then(checkResponse)
    .catch((err) => {
      if (err.message === "jwt expired") {
        return refreshToken().then((refreshData) => {
          if (!refreshData.success) {
            return Promise.reject(refreshData);
          }
          localStorage.setItem("refreshToken", refreshData.refreshToken);
          setCookie("accessToken", refreshData.accessToken);
          options.headers.authorization = refreshData.accessToken;
          return request(url, options);
        });
      } else {
        return Promise.reject(err);
      }
    });
};
