import { useState } from "react";
import { FiUser } from "react-icons/fi";
import Navbar from "../components/Navbar";
import AadhaarForm from "../components/abha/AadhaarForm";

const PatientForm = () => {
  const [patientType, setPatientType] =
    useState<"new" | "existing">("existing");

  // =====================================================
  // Aadhaar OTP Callback
  // =====================================================

  const handleOtpSent = (txnId: string, message: string) => {
    console.log("OTP Sent");
    console.log("Transaction ID:", txnId);
    console.log("Message:", message);

    // AadhaarForm will navigate to OTP page
    // so nothing else is required here.
  };

  // =====================================================
  // Patient Type
  // =====================================================

  const handlePatientTypeChange = (
    type: "new" | "existing"
  ) => {
    setPatientType(type);
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg border border-gray-200 p-6 md:p-8">

          {/* =====================================================
              Header
          ====================================================== */}

          <div className="mb-7">

            <div className="flex items-center gap-3 mb-2">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FiUser size={22} />
              </div>

              <div>

                <h2 className="text-xl font-semibold text-gray-800">
                  Patient Information
                </h2>

                <p className="text-sm text-gray-500">
                  Enter patient details
                </p>

              </div>

            </div>

          </div>


          {/* =====================================================
              Patient Type
          ====================================================== */}

          <div className="mb-6">

            <label className="mb-3 block text-sm font-medium text-gray-700">
              Patient Type
            </label>

            <div className="grid grid-cols-2 gap-3">

              {/* New Patient */}

              <label
                onClick={() =>
                  handlePatientTypeChange("new")
                }
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  patientType === "new"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >

                <input
                  type="radio"
                  name="patientType"
                  value="new"
                  checked={patientType === "new"}
                  onChange={() =>
                    handlePatientTypeChange("new")
                  }
                  className="h-4 w-4 accent-blue-600"
                />

                <div>

                  <p className="text-sm font-medium text-gray-800">
                    New Patient
                  </p>

                  <p className="text-xs text-gray-500">
                    Register a new patient
                  </p>

                </div>

              </label>


              {/* Existing Patient */}

              <label
                onClick={() =>
                  handlePatientTypeChange("existing")
                }
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  patientType === "existing"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >

                <input
                  type="radio"
                  name="patientType"
                  value="existing"
                  checked={patientType === "existing"}
                  onChange={() =>
                    handlePatientTypeChange("existing")
                  }
                  className="h-4 w-4 accent-blue-600"
                />

                <div>

                  <p className="text-sm font-medium text-gray-800">
                    Existing Patient
                  </p>

                  <p className="text-xs text-gray-500">
                    Search existing patient
                  </p>

                </div>

              </label>

            </div>

          </div>


          {/* =====================================================
              EXISTING PATIENT
              Aadhaar Form
          ====================================================== */}

          {patientType === "existing" && (
            <AadhaarForm
              onOtpSent={handleOtpSent}
            />
          )}


          {/* =====================================================
              NEW PATIENT
          ====================================================== */}

          {patientType === "new" && (

            <div className="rounded-xl border border-gray-200 p-5">

              <h2 className="text-lg font-semibold text-gray-800">
                New Patient
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                New patient registration form will appear here.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default PatientForm;