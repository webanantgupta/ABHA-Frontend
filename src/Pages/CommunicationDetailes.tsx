import { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiShield,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface CommunicationDetailsProps {
  onNext?: (data: {
    mobile: string;
    mobileOtp?: string;
    email?: string;
    emailOtp?: string;
  }) => Promise<void> | void;

  onSkipEmail?: () => void;
}

const CommunicationDetails = ({
  onNext,
  onSkipEmail,
}: CommunicationDetailsProps) => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState<string>("");
  const [mobileOtp, setMobileOtp] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [emailOtp, setEmailOtp] = useState<string>("");

  const [mobileOtpSent, setMobileOtpSent] = useState<boolean>(false);
  const [emailOtpSent, setEmailOtpSent] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [sendingMobileOtp, setSendingMobileOtp] =
    useState<boolean>(false);
  const [sendingEmailOtp, setSendingEmailOtp] =
    useState<boolean>(false);

  const [emailSkipped, setEmailSkipped] = useState<boolean>(false);

  // Mobile number
  const handleMobileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setMobile(value);
    }
  };

  // Mobile OTP
  const handleMobileOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setMobileOtp(value);
    }
  };

  // Email
  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
    setEmailSkipped(false);
  };

  // Email OTP
  const handleEmailOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setEmailOtp(value);
    }
  };

  // Send Mobile OTP
  const handleSendMobileOtp = async () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setSendingMobileOtp(true);

      // API call here
      // await axios.post("/api/send-mobile-otp", { mobile });

      setMobileOtpSent(true);
    } catch (error) {
      console.error("Mobile OTP error:", error);
      alert("Unable to send mobile OTP");
    } finally {
      setSendingMobileOtp(false);
    }
  };

  // Send Email OTP
  const handleSendEmailOtp = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    try {
      setSendingEmailOtp(true);

      // API call here
      // await axios.post("/api/send-email-otp", { email });

      setEmailOtpSent(true);
    } catch (error) {
      console.error("Email OTP error:", error);
      alert("Unable to send email OTP");
    } finally {
      setSendingEmailOtp(false);
    }
  };

  // Skip Email
  const handleSkipEmail = () => {
    setEmailSkipped(true);
    setEmail("");
    setEmailOtp("");
    setEmailOtpSent(false);

    if (onSkipEmail) {
      onSkipEmail();
    }
  };

  // Next
  const handleNext = async () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!mobileOtpSent || mobileOtp.length !== 6) {
      alert("Please verify your mobile number");
      return;
    }

    if (email && !emailSkipped) {
      if (!emailOtpSent || emailOtp.length !== 6) {
        alert("Please verify your email or skip it");
        return;
      }
    }

    try {
      setLoading(true);

      const data = {
        mobile,
        mobileOtp,
        email: emailSkipped ? undefined : email || undefined,
        emailOtp: emailSkipped ? undefined : emailOtp || undefined,
      };

      if (onNext) {
        await onNext(data);
      }

      // Navigate only after successful processing
      navigate("/abha-address-suggestion");
    } catch (error) {
      console.error("Failed to continue:", error);
      alert("Unable to continue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">

          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
              <FiShield className="text-3xl text-blue-600" />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Communication Details
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Provide your communication details to continue.
            </p>
          </div>

          {/* Mobile Section */}
          <div className="mt-7">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Communication Mobile Number
            </label>

            <div className="flex gap-2">
              <div className="flex flex-1 items-center rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <FiPhone className="ml-3 text-gray-400" />

                <input
                  type="tel"
                  inputMode="numeric"
                  value={mobile}
                  onChange={handleMobileChange}
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleSendMobileOtp}
                disabled={
                  sendingMobileOtp ||
                  mobile.length !== 10 ||
                  mobileOtpSent
                }
                className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {sendingMobileOtp
                  ? "Sending..."
                  : mobileOtpSent
                  ? "OTP Sent"
                  : "Send OTP"}
              </button>
            </div>
          </div>

          {/* Mobile OTP */}
          {mobileOtpSent && (
            <div className="mt-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Mobile OTP
              </label>

              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" />

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={mobileOtp}
                  onChange={handleMobileOtpChange}
                  placeholder="Enter 6-digit mobile OTP"
                  className="w-full rounded-lg border border-gray-300 px-10 py-3 text-center tracking-[0.4em] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {mobileOtp.length === 6 && (
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <FiCheckCircle />
                  <span>OTP entered</span>
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="my-7 border-t border-gray-100" />

          {/* Email Section */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
                <span className="ml-1 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              {!emailSkipped && (
                <button
                  type="button"
                  onClick={handleSkipEmail}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Skip For Now
                </button>
              )}
            </div>

            {emailSkipped ? (
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-500">
                  Email verification skipped.
                </p>

                <button
                  type="button"
                  onClick={() => setEmailSkipped(false)}
                  className="mt-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Add Email
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <div className="flex flex-1 items-center rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                    <FiMail className="ml-3 text-gray-400" />

                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter email address"
                      className="w-full bg-transparent px-3 py-3 outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendEmailOtp}
                    disabled={
                      sendingEmailOtp ||
                      !email ||
                      emailOtpSent
                    }
                    className="rounded-lg bg-gray-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {sendingEmailOtp
                      ? "Sending..."
                      : emailOtpSent
                      ? "OTP Sent"
                      : "Send OTP"}
                  </button>
                </div>

                {/* Email OTP */}
                {emailOtpSent && (
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email OTP
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={emailOtp}
                      onChange={handleEmailOtpChange}
                      placeholder="Enter 6-digit email OTP"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center tracking-[0.4em] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {loading ? "Processing..." : "Next"}

            {!loading && <FiArrowRight className="text-lg" />}
          </button>

          {/* Footer */}
          <p className="mt-4 text-center text-xs text-gray-400">
            Your communication details are used for ABHA-related
            communications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunicationDetails;