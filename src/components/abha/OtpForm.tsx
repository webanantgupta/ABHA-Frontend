import { useState } from "react";
import { verifyAbhaOtp } from "../../services/abhaApi";
import type { VerifyOtpResponse } from "../../types/abha";

interface OtpFormProps {
  txnId: string;
  message: string;
  onVerified: (
    response: VerifyOtpResponse
  ) => void;
  onBack: () => void;
}

const OtpForm = ({
  txnId,
  message,
  onVerified,
  onBack,
}: OtpFormProps) => {

  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // =====================================================
  // OTP Input
  // =====================================================

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
    setError("");
  };


  // =====================================================
  // Mobile Input
  // =====================================================

  const handleMobileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setMobile(value);
    setError("");
  };


  // =====================================================
  // Verify OTP
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");


    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }


    if (!/^\d{6}$/.test(otp)) {
      setError(
        "OTP must contain exactly 6 digits."
      );
      return;
    }


    if (!mobile) {
      setError(
        "Please enter your mobile number."
      );
      return;
    }


    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }


    try {

      setLoading(true);

      const response =
        await verifyAbhaOtp(
          txnId,
          otp,
          mobile
        ) as VerifyOtpResponse;


      if (!response.success) {

        setError(
          response.message ||
          "OTP verification failed."
        );

        return;
      }


      onVerified(response);

    } catch (error: any) {

      console.error(
        "Verify OTP Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to verify OTP. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-900">
          Verify OTP
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Enter the OTP sent to your Aadhaar
          registered mobile number.
        </p>

      </div>


      <div className="mb-5 rounded-xl bg-green-50 p-4">

        <p className="text-sm text-green-700">
          {message}
        </p>

      </div>


      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* OTP */}

        <div>

          <label
            htmlFor="otp"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            OTP
          </label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6 digit OTP"
            maxLength={6}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.4em] text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>


        {/* Mobile */}

        <div>

          <label
            htmlFor="mobile"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Mobile Number
          </label>

          <input
            id="mobile"
            type="text"
            inputMode="numeric"
            autoComplete="tel"
            value={mobile}
            onChange={handleMobileChange}
            placeholder="Enter 10 digit mobile"
            maxLength={10}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>


        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}


        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {loading
            ? "Verifying..."
            : "Verify OTP"}

        </button>


        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Back
        </button>

      </form>

    </div>
  );
};

export default OtpForm;