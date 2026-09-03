import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v2/abha";


// =====================================================
// Request OTP
// =====================================================

export const requestAbhaOtp = async (
  aadhaar: string
) => {
  const response = await axios.post(
    `${API_BASE_URL}/request-otp`,
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
    `${API_BASE_URL}/verify-otp`,
    {
      txnId,
      otp,
      mobile,
    }
  );

  return response.data;
};