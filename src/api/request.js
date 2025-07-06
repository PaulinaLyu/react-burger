import { STATUS_OK } from "../contants";

export const request = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (response.status !== STATUS_OK) {
    throw new Error(`HTTP ошибка: ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Ошибка сервера");
  }

  return result;
};
