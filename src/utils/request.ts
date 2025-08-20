import { ResponseWithOptionalSuccess } from "../types";
import { checkResponse } from "./checkResponse";

export const request = async <TResponse extends ResponseWithOptionalSuccess>(
  url: string,
  options: RequestInit = {}
): Promise<TResponse> => {
  const response = await fetch(url, options);
  return checkResponse<TResponse>(response);
};
