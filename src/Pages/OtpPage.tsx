import { useLocation, useNavigate } from "react-router-dom";
import OtpForm from "../components/abha/OtpForm";
import type { VerifyOtpResponse } from "../types/abha";
import Navbar from "../components/Navbar";

interface OtpPageState {
  txnId: string;
  message: string;
}

const OtpPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state as OtpPageState | null;


  // =====================================================
  // Protect OTP Page
  // =====================================================

  if (!state?.txnId) {

    return (
        
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-center">

          <h2 className="text-xl font-bold text-gray-800">
            OTP Session Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please go back and request a new OTP.
          </p>

          <button
            onClick={() =>
              navigate("/patient")
            }
            className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Go Back
          </button>

        </div>

      </div>

    );
  }


  // =====================================================
  // OTP Verified
  // =====================================================

  const handleVerified = (
    response: VerifyOtpResponse
  ) => {

    console.log(
      "OTP Verification Response:",
      response
    );


    // =================================================
    // Navigate to ABHA Profile
    // =================================================

    navigate("/abha-profile", {
      state: {
        profile: response,
        isNew: response.isNew,
      },
    });

  };


  // =====================================================
  // Back
  // =====================================================

  const handleBack = () => {

    navigate("/patient");

  };


  return (
    <div>
<Navbar/>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <OtpForm
        txnId={state.txnId}
        message={state.message}
        onVerified={handleVerified}
        onBack={handleBack}
      />

    </div>
    </div>

    
  );
};

export default OtpPage;