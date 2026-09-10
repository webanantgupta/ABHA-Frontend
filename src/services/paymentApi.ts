import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080";


// =====================================
// GET JWT TOKEN
// =====================================

const getToken = () => {
    return localStorage.getItem("token");
};


// =====================================
// AUTH HEADERS
// =====================================

const getAuthHeaders = () => {

    const token = getToken();

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};


// =====================================
// CREATE PAYMENT
// =====================================

export const createPayment = async (
    amount: number
) => {

    const response = await axios.post(

        `${API_BASE_URL}/api/v1/payment/create`,

        {
            amount,
        },

        {
            headers: getAuthHeaders(),
        }

    );

    return response.data;
};


// =====================================
// CHECK PAYMENT STATUS
// =====================================

export const checkPaymentStatus = async (
    merchantOrderId: string
) => {

    const response = await axios.get(

        `${API_BASE_URL}/api/v1/payment/status/${merchantOrderId}`,

        {
            headers: getAuthHeaders(),
        }

    );

    return response.data;
};


// =====================================
// GET PAYMENT HISTORY
// =====================================

export const getPaymentHistory = async () => {

    const response = await axios.get(

        `${API_BASE_URL}/api/v1/payment/history`,

        {
            headers: getAuthHeaders(),
        }

    );

    return response.data;
};