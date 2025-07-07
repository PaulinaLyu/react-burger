import { checkResponse } from "./checkResponse";

export const request = async (url, options = {}) => {
  const response = await fetch(url, options);
  return checkResponse(response);
};
