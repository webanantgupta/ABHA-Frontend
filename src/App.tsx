import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
// import CreateAbhaNumber from "./Pages/CreateAbhaNumber"
import ConsentCollection from "./Pages/ConsentCollection"
import AadhaarOtp from "./Pages/AadhaarOtp"
import CommunicationDetails from "./Pages/CommunicationDetailes"
import AbhaAddress from "./Pages/AbhaAddress"
import PatientForm from "./Pages/PatientForm"
import PersonalDetails from "./Pages/PersonalDetailes"
// import AadhaarForm from "./components/abha/AadhaarForm"
// import OtpForm from "./components/abha/OtpForm"
import OtpPage from "./Pages/OtpPage"
// import AbhaProfile from "./components/abha/AbhaProfile"
import AbhaProfilePage from "./Pages/AbhaProfilePage"
// import RegisterAbha from "./Pages/RegisterAbha"
// import PaymentButton from "./components/PaymentButton";

// import PayButton from "./components/PayButton"
function App() {
  

  return (
   <>
   <BrowserRouter>
   <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/create-abha" element={<ConsentCollection/>}/>
<Route path="/aadhaar-otp" element={<AadhaarOtp/>}/>
<Route path="/communication-detailes" element={<CommunicationDetails/>}/>
<Route path="/abha-address-suggestion" element={<AbhaAddress/>}/>
<Route path="/patient-form" element={<PatientForm/>}/>
<Route path="/personal-detailes" element={<PersonalDetails/>}/>
<Route path="/verify-otp" element={<OtpPage/>}/>
<Route path="/abha-profile" element={<AbhaProfilePage/>}/>
   </Routes>
   
   </BrowserRouter>
   {/* <RegisterAbha/> */}
  
   {/* <PayButton/> */}
   </>
  )
}

export default App






// import { useState } from "react";

// import AadhaarForm from "./components/abha/AadhaarForm";
// import OtpForm from "./components/abha/OtpForm";
// import AbhaProfile from "./components/abha/AbhaProfile";

// import type {
//   VerifyOtpResponse,
// } from "./types/abha";


// type Step =
//   | "aadhaar"
//   | "otp"
//   | "profile";


// function App() {

//   const [step, setStep] =
//     useState<Step>("aadhaar");

//   const [txnId, setTxnId] =
//     useState("");

//   const [otpMessage, setOtpMessage] =
//     useState("");

//   const [profileResponse, setProfileResponse] =
//     useState<VerifyOtpResponse | null>(null);


//   // =====================================================
//   // OTP Sent
//   // =====================================================

//   const handleOtpSent = (
//     transactionId: string,
//     message: string
//   ) => {

//     setTxnId(transactionId);

//     setOtpMessage(message);

//     setStep("otp");
//   };


//   // =====================================================
//   // OTP Verified
//   // =====================================================

//   const handleOtpVerified = (
//     response: VerifyOtpResponse
//   ) => {

//     setProfileResponse(response);

//     setStep("profile");
//   };


//   // =====================================================
//   // Go Back
//   // =====================================================

//   const handleBack = () => {

//     setStep("aadhaar");

//     setTxnId("");

//     setOtpMessage("");
//   };


//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-10">

//       <div className="mx-auto flex max-w-5xl flex-col items-center">

//         {/* Header */}

//         <div className="mb-8 text-center">

//           <h1 className="text-3xl font-bold text-gray-900">
//             ABHA
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Ayushman Bharat Health Account
//           </p>

//         </div>


//         {/* Progress */}

//         <div className="mb-8 flex items-center gap-2">

//           <StepIndicator
//             number={1}
//             label="Aadhaar"
//             active={step === "aadhaar"}
//             completed={
//               step === "otp" ||
//               step === "profile"
//             }
//           />

//           <div className="h-px w-10 bg-gray-300" />

//           <StepIndicator
//             number={2}
//             label="OTP"
//             active={step === "otp"}
//             completed={
//               step === "profile"
//             }
//           />

//           <div className="h-px w-10 bg-gray-300" />

//           <StepIndicator
//             number={3}
//             label="Profile"
//             active={step === "profile"}
//             completed={false}
//           />

//         </div>


//         {/* Step 1 */}

//         {step === "aadhaar" && (

//           <AadhaarForm
//             onOtpSent={handleOtpSent}
//           />

//         )}


//         {/* Step 2 */}

//         {step === "otp" && (

//           <OtpForm
//             txnId={txnId}
//             message={otpMessage}
//             onVerified={handleOtpVerified}
//             onBack={handleBack}
//           />

//         )}


//         {/* Step 3 */}

//         {step === "profile" &&
//           profileResponse?.ABHAProfile && (

//             <AbhaProfile
//               profile={
//                 profileResponse.ABHAProfile
//               }
//               isNew={
//                 profileResponse.isNew
//               }
//             />

//         )}

//       </div>

//     </main>
//   );
// }


// // =====================================================
// // Step Indicator
// // =====================================================

// interface StepIndicatorProps {
//   number: number;
//   label: string;
//   active: boolean;
//   completed: boolean;
// }

// const StepIndicator = ({
//   number,
//   label,
//   active,
//   completed,
// }: StepIndicatorProps) => {

//   return (
//     <div className="flex items-center gap-2">

//       <div
//         className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
//           active || completed
//             ? "bg-blue-600 text-white"
//             : "bg-gray-200 text-gray-500"
//         }`}
//       >
//         {number}
//       </div>

//       <span
//         className={`hidden text-sm font-medium sm:block ${
//           active || completed
//             ? "text-blue-600"
//             : "text-gray-400"
//         }`}
//       >
//         {label}
//       </span>

//     </div>
//   );
// };


// export default App;
