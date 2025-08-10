import { STATUS_OK } from "../contants";
import { ResponseWithOptionalSuccess } from "../types";

export const checkResponse = async <
  TResponse extends ResponseWithOptionalSuccess
>(
  response: Response
): Promise<TResponse> => {
  if (response.status !== STATUS_OK) {
    throw new Error(`HTTP ошибка: ${response.status}: ${response.statusText}`);
  }

  const result: TResponse = await response.json();

  if (result.success !== undefined && !result.success) {
    throw new Error("Ошибка сервера");
  }

  return result;
};
