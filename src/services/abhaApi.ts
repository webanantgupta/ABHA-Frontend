import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API BASE URL:", API_BASE_URL);

// =====================================================
// Request OTP
// =====================================================

export const requestAbhaOtp = async (aadhaar: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v2/abha/request-otp`,
    {
      aadhaar,
    }
  );

  return response.data;
};

// =====================================================
// Verify OTP
// =====================================================

export const verifyAbhaOtp = async (
  txnId: string,
  otp: string,
  mobile: string
) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v2/abha/verify-otp`,
    {
      txnId,
      otp,
      mobile,
    }
  );

  return response.data;
};