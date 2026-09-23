import axios from "axios";

import type {
  AuthResponse,
  LoginData,
  SignupData,
} from "../types/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080";


// ===============================
// LOGIN
// ===============================

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {

  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/api/v1/auth/login`,
    data
  );

  console.log("LOGIN RESPONSE:", response.data);

  return response.data;
};


// ===============================
// SIGNUP
// ===============================

export const signupUser = async (
  data: SignupData
): Promise<AuthResponse> => {

  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/api/v1/auth/register`,
    data
  );

  console.log("SIGNUP RESPONSE:", response.data);

  return response.data;
};