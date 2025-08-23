import axios, { type AxiosRequestConfig, type Method } from "axios";
import { API_URL } from "@/config/constants";
import { type ApiResponse } from "@/types/api-response-type";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

interface RequestOptions {
  method?: Method;
  body?: any;
  headers?: Record<string, string>;
  auth?: boolean;
  skipJson?: boolean;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    body,
    headers = {},
    auth = true,
    skipJson = false,
  } = options;

  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    headers: { "Content-Type": "application/json", ...headers },
    data: body,
    withCredentials: auth,
    validateStatus: () => true,
  };

  const response = await apiClient.request<T>(config);

  if (skipJson) {
    return {
      status: response.status < 400 ? "success" : "error",
      code: response.status,
      data: response.data,
    };
  }

  return response.data as unknown as ApiResponse<T>;
}
