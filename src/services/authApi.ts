import axios from "axios";

import type {
  AuthResponse,
  LoginData,
  SignupData,
} from "../types/auth";

const API_BASE_URL = "http://localhost:8080/api/v1";

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/login`,
    data
  );

  return response.data;
};

export const signupUser = async (
  data: SignupData
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/register`,
    data
  );

  return response.data;
};