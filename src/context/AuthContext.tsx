import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../types/auth";
import {
  loginUser,
  signupUser,
} from "../services/authApi";


// =====================================
// CONTEXT TYPE
// =====================================

interface AuthContextType {

  user: User | null;

  token: string | null;

  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
}


// =====================================
// CREATE CONTEXT
// =====================================

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );


// =====================================
// PROVIDER PROPS
// =====================================

interface AuthProviderProps {
  children: ReactNode;
}


// =====================================
// AUTH PROVIDER
// =====================================

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {

  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem("token")
    );


  const [user, setUser] =
    useState<User | null>(() => {

      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      try {

        return JSON.parse(storedUser);

      } catch {

        return null;

      }

    });


  const [loading, setLoading] =
    useState(false);


  // =====================================
  // LOGIN
  // =====================================

  const login = async (
    email: string,
    password: string
  ) => {

    try {

      setLoading(true);


      const response =
        await loginUser({
          email,
          password,
        });


      console.log(
        "AUTH LOGIN RESPONSE:",
        response
      );


      if (!response.success) {

        throw new Error(
          response.message
        );

      }


      // =================================
      // CHECK JWT
      // =================================

      if (!response.token) {

        throw new Error(
          "Login successful but JWT token was not received."
        );

      }


      // =================================
      // SAVE JWT
      // =================================

      localStorage.setItem(
        "token",
        response.token
      );


      // =================================
      // SAVE USER
      // =================================

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );


      // =================================
      // UPDATE STATE
      // =================================

      setToken(response.token);

      setUser(response.user);


      console.log(
        "JWT SAVED:",
        !!localStorage.getItem("token")
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================
  // SIGNUP
  // =====================================

  const signup = async (
    name: string,
    email: string,
    password: string
  ) => {

    try {

      setLoading(true);


      const response =
        await signupUser({
          name,
          email,
          password,
        });


      console.log(
        "AUTH SIGNUP RESPONSE:",
        response
      );


      if (!response.success) {

        throw new Error(
          response.message
        );

      }


      // =================================
      // CHECK JWT
      // =================================

      if (!response.token) {

        throw new Error(
          "Signup successful but JWT token was not received."
        );

      }


      // =================================
      // SAVE JWT
      // =================================

      localStorage.setItem(
        "token",
        response.token
      );


      // =================================
      // SAVE USER
      // =================================

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );


      // =================================
      // UPDATE STATE
      // =================================

      setToken(response.token);

      setUser(response.user);


      console.log(
        "JWT SAVED:",
        !!localStorage.getItem("token")
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );


    setToken(null);

    setUser(null);

  };


  // =====================================
  // PROVIDER
  // =====================================

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


// =====================================
// useAuth HOOK
// =====================================

export const useAuth = () => {

  const context =
    useContext(AuthContext);


  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }


  return context;

};