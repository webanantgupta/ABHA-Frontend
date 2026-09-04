import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./Pages/Home";
import ConsentCollection from "./Pages/ConsentCollection";
import AadhaarOtp from "./Pages/AadhaarOtp";
import CommunicationDetails from "./Pages/CommunicationDetailes";
import AbhaAddress from "./Pages/AbhaAddress";
import PatientForm from "./Pages/PatientForm";
import PersonalDetails from "./Pages/PersonalDetailes";
import OtpPage from "./Pages/OtpPage";
import AbhaProfilePage from "./Pages/AbhaProfilePage";

interface Phase1Data {
  aadhaarNumber: string;
  consent: boolean;
  authenticationType: string;
  captcha: string;
}

function ConsentCollectionRoute() {
  const navigate = useNavigate();

  const handleNext = (data: Phase1Data) => {
    console.log("Phase 1 Data:", data);

    // Move to Aadhaar OTP page after successful validation
    navigate("/aadhaar-otp");
  };

  return <ConsentCollection onNext={handleNext} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/create-abha"
          element={<ConsentCollectionRoute />}
        />

        <Route
          path="/aadhaar-otp"
          element={<AadhaarOtp />}
        />

        <Route
          path="/communication-detailes"
          element={<CommunicationDetails />}
        />

        <Route
          path="/abha-address-suggestion"
          element={<AbhaAddress />}
        />

        <Route
          path="/patient-form"
          element={<PatientForm />}
        />

        <Route
          path="/personal-detailes"
          element={<PersonalDetails />}
        />

        <Route
          path="/verify-otp"
          element={<OtpPage />}
        />

        <Route
          path="/abha-profile"
          element={<AbhaProfilePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;