import { useState } from "react";
import {
  FaIdCard,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaInfoCircle,
  FaVolumeUp,
  FaSyncAlt,
  FaArrowRight,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

interface Phase1Data {
  aadhaarNumber: string;
  consent: boolean;
  authenticationType: string;
  captcha: string;
}

interface ConsentCollectionProps {
  onNext: (data: Phase1Data) => void;
}

const ConsentCollection = ({ onNext }: ConsentCollectionProps) => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [authenticationType, setAuthenticationType] =
    useState("AADHAAR_OTP");
  const [captcha, setCaptcha] = useState("");
  const [showAadhaar, setShowAadhaar] = useState(false);

  const [captchaText, setCaptchaText] = useState("5142");
  const [errors, setErrors] = useState<{
    aadhaar?: string;
    consent?: string;
    captcha?: string;
  }>({});

  // Remove spaces and hyphens
  const cleanAadhaar = aadhaarNumber.replace(/\D/g, "");

  const formatAadhaar = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 12);

    return numbers.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleAadhaarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formattedValue = formatAadhaar(e.target.value);
    setAadhaarNumber(formattedValue);

    setErrors((prev) => ({
      ...prev,
      aadhaar: "",
    }));
  };

  const refreshCaptcha = () => {
    // Demo only.
    // In production, obtain a fresh CAPTCHA from your backend/ABDM flow.
    const newCaptcha = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    setCaptchaText(newCaptcha);
    setCaptcha("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: {
      aadhaar?: string;
      consent?: string;
      captcha?: string;
    } = {};

    // Aadhaar validation
    if (!cleanAadhaar) {
      newErrors.aadhaar = "Please enter your Aadhaar number.";
    } else if (cleanAadhaar.length !== 12) {
      newErrors.aadhaar =
        "Aadhaar number must contain 12 digits.";
    }

    // Consent validation
    if (!consent) {
      newErrors.consent =
        "Please accept the terms and conditions.";
    }

    // CAPTCHA validation
    if (!captcha.trim()) {
      newErrors.captcha = "Please enter the CAPTCHA.";
    } else if (captcha !== captchaText) {
      newErrors.captcha = "Invalid CAPTCHA.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const phase1Data: Phase1Data = {
      aadhaarNumber: cleanAadhaar,
      consent,
      authenticationType,
      captcha,
    };

    console.log("Phase 1 Data:", phase1Data);

    onNext(phase1Data);
  };

  return (
    <div>
<Navbar/>
    <div className="w-full max-w-3xl mx-auto pt-20">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-blue-100 text-blue-600">
            <FaShieldAlt size={20} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Consent Collection
            </h2>

            <p className="text-sm text-slate-500">
              Step 1 of 4
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">

        <form onSubmit={handleSubmit}>

          {/* ==============================
              AADHAAR NUMBER
          =============================== */}

          <div className="p-6 border-b border-slate-200">

            <label
              htmlFor="aadhaar"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Aadhaar Number
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="flex items-center gap-3">

              <div className="relative flex-1 max-w-md">

                <FaIdCard
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  id="aadhaar"
                  name="aadhaar"
                  type={showAadhaar ? "text" : "password"}
                  value={aadhaarNumber}
                  onChange={handleAadhaarChange}
                  placeholder="0000 0000 0000"
                  inputMode="numeric"
                  autoComplete="off"
                  className={`w-full pl-10 pr-11 py-3 border rounded-lg outline-none transition ${
                    errors.aadhaar
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowAadhaar((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={
                    showAadhaar
                      ? "Hide Aadhaar number"
                      : "Show Aadhaar number"
                  }
                >
                  {showAadhaar ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {errors.aadhaar && (
              <p className="text-sm text-red-500 mt-2">
                {errors.aadhaar}
              </p>
            )}

            {/* Information */}
            <div className="mt-3 flex items-start gap-2 text-sm text-indigo-600">
              <FaInfoCircle className="mt-0.5 shrink-0" />

              <p>
                Please ensure that your mobile number is linked
                with Aadhaar as it will be required for OTP
                authentication.
              </p>
            </div>

            <p className="mt-2 ml-6 text-sm text-indigo-600">
              If you do not have a mobile number linked with
              Aadhaar, visit the nearest ABDM participating
              facility and seek assistance.
            </p>

          </div>


          {/* ==============================
              TERMS & CONDITIONS
          =============================== */}

          <div className="p-6 border-b border-slate-200">

            <div className="border border-slate-200 rounded-lg">

              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                <h3 className="font-semibold text-slate-700">
                  Terms and Conditions
                </h3>
              </div>

              <div className="h-40 overflow-y-auto p-4 text-sm text-slate-600 leading-6">

                <p>
                  I hereby declare that I am voluntarily sharing
                  my Aadhaar number and demographic information
                  issued by UIDAI with the National Health
                  Authority (NHA) for the sole purpose of creation
                  of ABHA number.
                </p>

                <p className="mt-3">
                  I understand that my ABHA number can be used
                  and shared for purposes as may be notified by
                  ABDM from time to time including provision of
                  healthcare services.
                </p>

                <p className="mt-3">
                  I am aware that my personal information may be
                  made available to entities working in the
                  healthcare ecosystem as permitted by the
                  applicable ABDM policies and consent framework.
                </p>

                <p className="mt-3">
                  I understand that authentication and
                  demographic information will be processed in
                  accordance with the applicable terms and
                  privacy policies.
                </p>

              </div>

              {/* Consent checkbox */}
              <div className="px-4 py-3 border-t border-slate-200">

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);

                      setErrors((prev) => ({
                        ...prev,
                        consent: "",
                      }));
                    }}
                    className="w-5 h-5 accent-blue-600"
                  />

                  <span className="font-semibold text-slate-700">
                    I agree
                  </span>

                </label>

                {errors.consent && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.consent}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* ==============================
              AUTHENTICATION TYPE
          =============================== */}

          <div className="p-6 border-b border-slate-200">

            <label
              htmlFor="authenticationType"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Authentication Type
              <span className="text-red-500 ml-1">*</span>
            </label>

            <select
              id="authenticationType"
              name="authenticationType"
              value={authenticationType}
              onChange={(e) =>
                setAuthenticationType(e.target.value)
              }
              className="w-full max-w-md px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            >
              <option value="AADHAAR_OTP">
                Aadhaar OTP
              </option>
            </select>

          </div>


          {/* ==============================
              CAPTCHA
          =============================== */}

          <div className="p-6">

            <label
              htmlFor="captcha"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              CAPTCHA
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="w-full max-w-xl border border-slate-200 rounded-lg p-4">

              <div className="flex flex-col sm:flex-row gap-4 items-center">

                {/* Captcha display */}
                <div className="w-36 h-12 flex items-center justify-center bg-slate-100 rounded-md border border-slate-200 select-none">
                  <span className="text-2xl font-bold italic tracking-widest text-indigo-600">
                    {captchaText}
                  </span>
                </div>

                {/* Captcha input */}
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  value={captcha}
                  onChange={(e) => {
                    setCaptcha(e.target.value);

                    setErrors((prev) => ({
                      ...prev,
                      captcha: "",
                    }));
                  }}
                  placeholder="Enter answer"
                  autoComplete="off"
                  className={`flex-1 w-full px-4 py-3 border rounded-lg outline-none transition ${
                    errors.captcha
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                />

                {/* Audio */}
                <button
                  type="button"
                  title="Listen to CAPTCHA"
                  className="text-blue-700 hover:text-blue-900 transition"
                >
                  <FaVolumeUp size={20} />
                </button>

                {/* Refresh */}
                <button
                  type="button"
                  title="Refresh CAPTCHA"
                  onClick={refreshCaptcha}
                  className="text-blue-700 hover:text-blue-900 transition"
                >
                  <FaSyncAlt size={20} />
                </button>

              </div>

              {errors.captcha && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.captcha}
                </p>
              )}

            </div>

          </div>


          {/* ==============================
              BUTTONS
          =============================== */}

          <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">

            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <Link
            to="/aadhaar-otp"
              className="flex items-center justify-center gap-2 px-7 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition"
            >
              Next
              <FaArrowRight size={14} />
            </Link>

          </div>

        </form>

      </div>

      {/* Security information */}
      <div className="mt-4 flex items-start gap-2 text-xs text-slate-500">
        <FaShieldAlt className="mt-0.5 text-green-600" />

        <p>
          Your Aadhaar information should be processed only
          through the authorized ABDM authentication flow.
          Do not store Aadhaar numbers unnecessarily in your
          application database.
        </p>
      </div>

    </div>
    </div>

  );
};

export default ConsentCollection;