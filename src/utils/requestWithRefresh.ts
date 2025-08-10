import { checkResponse } from "./checkResponse";
import { request } from "./request";
import { setCookie } from "./cookies";
import { refreshToken } from "../api/auth";
import { ResponseWithOptionalSuccess } from "../types";

export const requestWithRefresh = async <
  TResponse extends ResponseWithOptionalSuccess
>(
  url: string,
  options: RequestInit & { headers: Record<string, string> }
): Promise<TResponse> => {
  try {
    const response = await fetch(url, options);
    return await checkResponse<TResponse>(response);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      refreshData.refreshToken &&
        localStorage.setItem("refreshToken", refreshData.refreshToken);

      if (refreshData.accessToken) {
        setCookie("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
      }

      return request<TResponse>(url, options);
    }

    return Promise.reject(err);
  }
};
