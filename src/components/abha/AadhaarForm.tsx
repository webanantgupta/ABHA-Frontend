import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestAbhaOtp } from "../../services/abhaApi";

interface AadhaarFormProps {
  onOtpSent: (txnId: string, message: string) => void;
}

const AadhaarForm = ({
  onOtpSent,
}: AadhaarFormProps) => {

  const navigate = useNavigate();

  const [aadhaar, setAadhaar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // =====================================================
  // Aadhaar Input
  // =====================================================

  const handleAadhaarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 12);

    setAadhaar(value);
    setError("");
  };


  // =====================================================
  // Request OTP
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");


    // Validate Aadhaar

    if (!aadhaar) {
      setError("Please enter Aadhaar number.");
      return;
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      setError(
        "Aadhaar number must contain exactly 12 digits."
      );
      return;
    }


    try {

      setLoading(true);

      const response =
        await requestAbhaOtp(aadhaar);

      console.log(
        "OTP Response:",
        response
      );


      if (!response.success) {

        setError(
          response.message ||
          "Unable to send OTP."
        );

        return;
      }


      // =================================================
      // OTP Successfully Sent
      // =================================================

      const txnId = response.txnId;
      const message = response.message;


      console.log("OTP Sent");
      console.log(
        "Transaction ID:",
        txnId
      );

      console.log(
        "Message:",
        message
      );


      // Parent callback

      onOtpSent(
        txnId,
        message
      );


      // =================================================
      // Navigate to OTP Page
      // =================================================

      navigate("/verify-otp", {
        state: {
          txnId,
          message,
        },
      });

    } catch (error: any) {

      console.error(
        "Request OTP Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to send OTP. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="w-full">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-900">
          Aadhaar Verification
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Enter your Aadhaar number to receive an OTP.
        </p>

      </div>


      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Aadhaar */}

        <div>

          <label
            htmlFor="aadhaar"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Aadhaar Number
          </label>

          <input
            id="aadhaar"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={aadhaar}
            onChange={handleAadhaarChange}
            placeholder="Enter 12 digit Aadhaar"
            maxLength={12}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>


        {/* Error */}

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}


        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {loading
            ? "Sending OTP..."
            : "Send OTP"}

        </button>

      </form>

    </div>
  );
};

export default AadhaarForm;