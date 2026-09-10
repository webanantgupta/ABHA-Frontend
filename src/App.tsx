// import { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./Pages/Home";
import ConsentCollection from "./Pages/ConsentCollection";
import AadhaarOtp from "./Pages/AadhaarOtp";
import CommunicationDetails from "./Pages/CommunicationDetailes";
import AbhaAddress from "./Pages/AbhaAddress";
import PatientForm from "./Pages/PatientForm";
import PersonalDetails from "./Pages/PersonalDetailes";
import OtpPage from "./Pages/OtpPage";
import AbhaProfilePage from "./Pages/AbhaProfilePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PaymentHistoryPags from "./Pages/PaymentHistoryPages";
import PaymentHistoryPages from "./Pages/PaymentHistoryPages";

// interface Phase1Data {
//   aadhaarNumber: string;
//   consent: boolean;
//   authenticationType: string;
//   captcha: string;
// }

function App() {
  // const [phase1Data, setPhase1Data] = useState<Phase1Data | null>(null);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

<Route path="/patient-login" element={<Login/>}/>

<Route path="/patient-signup" element={<Signup/>}/>

<Route path="/dashboard" element={<Dashboard/>}/>

<Route
    path="/payment-history"
    element={<PaymentHistoryPages />}
/>

        <Route
          path="/create-abha"
          element={
            <ConsentCollection
              onNext={(data) => {
                console.log("Phase 1 Data:", data);
                // setPhase1Data(data);
              }}
            />
          }
        />

        <Route path="/aadhaar-otp" element={<AadhaarOtp />} />

        <Route
          path="/communication-detailes"
          element={<CommunicationDetails />}
        />

        <Route
          path="/abha-address-suggestion"
          element={<AbhaAddress />}
        />

        <Route path="/patient-form" element={<PatientForm />} />

        <Route
          path="/personal-detailes"
          element={<PersonalDetails />}
        />

        <Route path="/verify-otp" element={<OtpPage />} />

        <Route
          path="/abha-profile"
          element={<AbhaProfilePage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;






