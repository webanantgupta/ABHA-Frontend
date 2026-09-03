import { useLocation, useNavigate } from "react-router-dom";
import AbhaProfile from "../components/abha/AbhaProfile";
import type { VerifyOtpResponse } from "../types/abha";
import Navbar from "../components/Navbar";

interface AbhaProfilePageState {
  profile: VerifyOtpResponse;
  isNew?: boolean | null;
}

const AbhaProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state as AbhaProfilePageState | null;

  // =====================================================
  // Complete OTP response
  // =====================================================

  const response = state?.profile ?? null;

  // =====================================================
  // Actual ABHA profile
  // =====================================================

  const profile = response?.ABHAProfile ?? null;

  const isNew =
    state?.isNew ??
    response?.isNew ??
    null;

  // =====================================================
  // Debug
  // =====================================================

  console.log("========== ABHA PROFILE PAGE ==========");
  console.log("LOCATION STATE:", location.state);
  console.log("COMPLETE RESPONSE:", response);
  console.log("ACTUAL ABHA PROFILE:", profile);
  console.log("IS NEW:", isNew);

  // =====================================================
  // Profile not available
  // =====================================================

  if (!profile) {
    return (
      <div>
        <Navbar />

        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <span className="text-xl font-bold text-red-500">
                !
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              Profile Not Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              ABHA profile data was not received from the server.
            </p>

            <button
              onClick={() => navigate("/patient")}
              className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Go to Patient Form
            </button>

          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // Show Profile
  // =====================================================

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-6">

        <div className="mx-auto flex w-full justify-center">

          <AbhaProfile
            profile={profile}
            isNew={isNew}
          />

        </div>

      </div>
    </div>
  );
};

export default AbhaProfilePage;
