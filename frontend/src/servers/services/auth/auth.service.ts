import { AxiosResponse } from "axios";
import { CONFIG } from "@/servers/config";
import { apiAuth } from "@/servers/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginAuth {
  access_token: string;
  email: string;
  role: string;
}

export async function loginAuth(
  signin: LoginRequest
): Promise<AxiosResponse<LoginAuth>> {
  const url = `${CONFIG.host}${CONFIG.port_auth}/auth/login`;

  try {
    const response = await apiAuth.post<LoginAuth>(url, signin);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
