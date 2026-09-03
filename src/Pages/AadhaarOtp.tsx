import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { FaArrowRight} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

interface AadhaarOtpProps {
  onVerify?: (otp: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
}

const AadhaarOtp = ({ onVerify, onResend }: AadhaarOtpProps) => {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resending, setResending] = useState<boolean>(false);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      if (onVerify) {
        await onVerify(otp);
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      if (onResend) {
        await onResend();
      } else {
        alert("OTP resent successfully");
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      alert("Unable to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div>
<Navbar/>
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 pt-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">

        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <div className="text-3xl text-blue-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Verify Aadhaar OTP
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Enter the 6-digit OTP sent to your Aadhaar-linked mobile number.
          </p>
        </div>

        {/* OTP Input */}
        <div className="mt-6">
          <label
            htmlFor="otp"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Aadhaar OTP
          </label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit OTP"
            autoComplete="one-time-code"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-lg tracking-[0.5em] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-xs text-gray-400">
            {otp.length}/6 digits
          </p>
        </div>

        {/* Verify Button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <div className="text-lg" />

          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <div className="mt-5 text-center">
          <span className="text-sm text-gray-500">
            Didn't receive the OTP?
          </span>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="ml-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            <FiRefreshCw
              className={`text-sm ${resending ? "animate-spin" : ""}`}
            />

            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>

        {/* Security message */}
        <div className="mt-6 rounded-lg bg-gray-50 p-3 text-center">
          <p className="text-xs text-gray-500">
            Your OTP is used only for Aadhaar authentication.
          </p>
        </div>
           <Link
            to="/communication-detailes"
              type="submit"
              className="flex items-center justify-center gap-2 px-7 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition"
            >
              Next
              <FaArrowRight size={14} />
            </Link>
      </div>
    </div>
    </div>

  );
};

export default AadhaarOtp;
