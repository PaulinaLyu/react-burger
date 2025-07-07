import { STATUS_OK } from "../contants";

export const checkResponse = async (response) => {
  if (response.status !== STATUS_OK) {
    throw new Error(`HTTP ошибка: ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Ошибка сервера");
  }

  return result;
};
