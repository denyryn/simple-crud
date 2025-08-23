import { apiFetch } from "./api";
import { API_BASE_URL } from "@/config/constants";
import type { User } from "@/types/user-type";
import type { ApiResponse } from "@/types/api-response-type";

type EmailCheck = { user?: User; intent: string };
type AuthData = { user: User };

export default class AuthService {
  static async userExists(email: string): Promise<ApiResponse<EmailCheck>> {
    const response = await apiFetch<EmailCheck>("/auth/check", {
      method: "POST",
      body: { email },
    });
    response.data = { ...response.data, intent: "check" };
    return response;
  }

  static async loginUser(credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthData>> {
    // Ensure CSRF cookie is set
    await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: "include",
    });

    const response = await apiFetch<AuthData>("/auth/login", {
      method: "POST",
      body: credentials,
      auth: true,
    });

    localStorage.removeItem("formValues");
    return response;
  }

  static async registerUser(credentials: {
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<ApiResponse<AuthData>> {
    const response = await apiFetch<AuthData>("/auth/register", {
      method: "POST",
      body: credentials,
      auth: false,
    });

    localStorage.removeItem("formValues");
    return response;
  }

  static async checkAuth(): Promise<ApiResponse<AuthData>> {
    const response = await apiFetch<AuthData>("/auth/user", {
      method: "GET",
      auth: true,
    });
    return response;
  }

  static async logoutUser(): Promise<ApiResponse<void>> {
    const response = await apiFetch<void>("/auth/logout", {
      method: "POST",
      auth: true,
    });

    return response;
  }
}
