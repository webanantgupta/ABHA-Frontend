import axios from "axios";


// =====================================
// API BASE URL
// =====================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080";


// =====================================
// GET JWT TOKEN
// =====================================

const getToken = () => {

  const token =
    localStorage.getItem("token");

  console.log(
    "PAYMENT JWT:",
    token
  );

  return token;
};


// =====================================
// AUTH HEADERS
// =====================================

const getAuthHeaders = () => {

  const token = getToken();


  if (!token) {

    throw new Error(
      "JWT token not found. Please login again."
    );

  }


  return {

    Authorization:
      `Bearer ${token}`,

    "Content-Type":
      "application/json",

  };

};


// =====================================
// CREATE PAYMENT
// =====================================

export const createPayment = async (
  amount: number
) => {

  console.log(
    "Creating payment for:",
    amount
  );


  const response =
    await axios.post(

      `${API_BASE_URL}/api/v1/payment/create`,

      {
        amount,
      },

      {
        headers:
          getAuthHeaders(),
      }

    );


  console.log(
    "PAYMENT API RESPONSE:",
    response.data
  );


  return response.data;

};


// =====================================
// CHECK PAYMENT STATUS
// =====================================

export const checkPaymentStatus =
  async (
    merchantOrderId: string
  ) => {

    const response =
      await axios.get(

        `${API_BASE_URL}/api/v1/payment/status/${merchantOrderId}`,

        {
          headers:
            getAuthHeaders(),
        }

      );


    return response.data;

  };


// =====================================
// PAYMENT HISTORY
// =====================================

export const getPaymentHistory =
  async () => {

    const response =
      await axios.get(

        `${API_BASE_URL}/api/v1/payment/history`,

        {
          headers:
            getAuthHeaders(),
        }

      );


    return response.data;

  };