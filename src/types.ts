import { Order, UserWithoutPassword } from "./models";

export interface ResponseWithOptionalSuccess {
  success?: boolean;
}

export interface ApiResponse<T = unknown> extends ResponseWithOptionalSuccess {
  accessToken?: string;
  refreshToken?: string;
  success: boolean;
  data: T;
}

export type ApiResponseWithoutData = Omit<ApiResponse, "data">;

export type AuthResponse = Omit<
  ApiResponse<{ user: UserWithoutPassword }>,
  "data"
> & { user: UserWithoutPassword };

export interface InfoResponse extends ResponseWithOptionalSuccess {
  message: string;
}

export interface InfoResponse extends ResponseWithOptionalSuccess {
  message: string;
}

export interface OrderResponse extends ResponseWithOptionalSuccess {
  name: string;
  order: Order;
}

export interface IResetPasswordForm {
  email: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  email: string;
  password: string;
  name: string;
}

export interface IApprovedResetPasswordForm {
  password: string;
  token: string;
}

export interface IProfileEditForm {
  email: string;
  password: string;
  name: string;
}
