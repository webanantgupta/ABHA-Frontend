// import { useState } from "react";
// import {
//   FaCreditCard,
//   FaSpinner,
//   FaRupeeSign,
// } from "react-icons/fa";

// import { createPayment } from "../services/paymentApi";

// const PaymentButton = () => {
//   const [amount, setAmount] = useState("");

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   const handlePayment = async () => {
//     try {
//       setError("");

//       // ================================
//       // VALIDATE AMOUNT
//       // ================================

//       const numericAmount = Number(amount);

//       if (!amount.trim()) {
//         setError("Please enter an amount.");
//         return;
//       }

//       if (numericAmount <= 0) {
//         setError("Please enter a valid amount.");
//         return;
//       }

//       // ================================
//       // CREATE PAYMENT
//       // ================================

//       setLoading(true);

//       const data = await createPayment(numericAmount);

//       console.log("Payment Response:", data);

//       // ================================
//       // REDIRECT TO PHONEPE
//       // ================================

//       if (data.success && data.paymentUrl) {
//         window.location.href = data.paymentUrl;
//         return;
//       }

//       setError("Payment URL was not received.");

//     } catch (error: any) {
//       console.error("PAYMENT ERROR:", error);

//       setError(
//         error.response?.data?.message ||
//         "Failed to create payment."
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-5">

//       {/* ================================
//           Amount Input
//       ================================= */}

//       <label className="mb-2 block text-sm font-semibold text-gray-700">
//         Enter Amount
//       </label>

//       <div className="relative">

//         <FaRupeeSign
//           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//         />

//         <input
//           type="number"
//           min="1"
//           step="0.01"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount"
//           disabled={loading}
//           className="
//             w-full
//             rounded-lg
//             border
//             border-gray-300
//             bg-white
//             py-3
//             pl-10
//             pr-4
//             text-gray-900
//             outline-none
//             transition
//             focus:border-blue-500
//             focus:ring-2
//             focus:ring-blue-100
//             disabled:cursor-not-allowed
//             disabled:bg-gray-100
//           "
//         />

//       </div>


//       {/* ================================
//           Pay Button
//       ================================= */}

//       <button
//         type="button"
//         onClick={handlePayment}
//         disabled={loading}
//         className="
//           mt-4
//           flex
//           w-full
//           items-center
//           justify-center
//           gap-2
//           rounded-lg
//           bg-[#D9742B]
//           px-6
//           py-3
//           font-semibold
//           text-white
//           transition
//           hover:bg-[#c76620]
//           disabled:cursor-not-allowed
//           disabled:opacity-60
//         "
//       >

//         {loading ? (
//           <>
//             <FaSpinner className="animate-spin" />
//             Processing...
//           </>
//         ) : (
//           <>
//             <FaCreditCard />

//             {amount
//               ? `Pay ₹${amount}`
//               : "Pay Now"}
//           </>
//         )}

//       </button>


//       {/* ================================
//           Error
//       ================================= */}

//       {error && (
//         <p className="mt-3 text-sm text-red-600">
//           {error}
//         </p>
//       )}

//     </div>
//   );
// };

// export default PaymentButton;





import { useState } from "react";

import {
  FaCreditCard,
  FaSpinner,
  FaRupeeSign,
} from "react-icons/fa";

import { createPayment } from "../services/paymentApi";

interface PayButtonProps {
  amount: number;
}

const PayButton = ({
  amount,
}: PayButtonProps) => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // HANDLE PAYMENT
  // =====================================================

  const handlePayment = async () => {

    try {

      setError("");

      // =====================================
      // VALIDATE APPOINTMENT / AMOUNT
      // =====================================

      if (!amount || amount <= 0) {

        setError(
          "Please book an appointment first."
        );

        return;
      }

      // =====================================
      // START PAYMENT
      // =====================================

      setLoading(true);

      console.log(
        "Starting PhonePe payment for amount:",
        amount
      );

      const data = await createPayment(
        amount
      );

      console.log(
        "PhonePe Payment Response:",
        data
      );

      // =====================================
      // PHONEPE CHECKOUT
      // =====================================

      if (
        data?.success &&
        data?.paymentUrl
      ) {

        console.log(
          "Redirecting to PhonePe:",
          data.paymentUrl
        );

        window.location.href =
          data.paymentUrl;

        return;
      }

      // =====================================
      // PAYMENT URL MISSING
      // =====================================

      setError(
        data?.message ||
        "PhonePe payment URL was not received."
      );

    } catch (error: any) {

      console.error(
        "PHONEPE PAYMENT ERROR:",
        error
      );

      setError(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to start PhonePe payment."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-5">

      {/* =====================================================
          PAYMENT AMOUNT
      ===================================================== */}

      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Payment Amount
      </label>

      <div className="relative">

        <FaRupeeSign
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="number"
          value={amount}
          readOnly
          disabled={loading}
          className="
            w-full
            rounded-lg
            border
            border-gray-300
            bg-gray-100
            py-3
            pl-10
            pr-4
            font-semibold
            text-gray-900
            outline-none
            disabled:cursor-not-allowed
          "
        />

      </div>

      {/* =====================================================
          PAYMENT BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={handlePayment}
        disabled={
          loading ||
          !amount ||
          amount <= 0
        }
        className="
          mt-4
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[#D9742B]
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-[#c76620]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >

        {loading ? (

          <>
            <FaSpinner className="animate-spin" />

            Redirecting to PhonePe...
          </>

        ) : (

          <>
            <FaCreditCard />

            {amount > 0
              ? `Pay ₹${amount}`
              : "Book Appointment First"}
          </>

        )}

      </button>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>

      )}

    </div>
  );
};

export default PayButton;