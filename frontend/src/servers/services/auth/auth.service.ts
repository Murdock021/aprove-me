import { AxiosResponse } from "axios";
import { CONFIG } from "@/servers/config";
import { apiAuth } from "@/servers/api";

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginAuth {
  login: string;
  password: string;
  token: string;
}

export async function loginAuth(
  signin: LoginRequest
): Promise<AxiosResponse<LoginAuth>> {
  const url = `${CONFIG.host}bankme/integrations/auth/sign-in`;
  try {
    const response = await apiAuth.post<LoginAuth>(url, signin);
    console.log(response);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
