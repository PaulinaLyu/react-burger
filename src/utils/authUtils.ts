import { setCookie } from "./cookies";
import { userStorageService } from "../services/userStorageService";
import { UserWithoutPassword } from "../models";

export const processAuthData = (payload: {
  accessToken?: string;
  refreshToken?: string;
  user?: UserWithoutPassword;
}) => {
  const accessToken = payload.accessToken?.split("Bearer ")[1];
  const refreshToken = payload.refreshToken;
  const user = payload.user;
  if (accessToken) {
    setCookie("accessToken", accessToken);
  }

  if (refreshToken && accessToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  if (user) {
    userStorageService.setUser(user);
  }
};
