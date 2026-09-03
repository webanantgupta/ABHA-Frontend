import axios from "axios";
import { useState } from "react";

interface PaymentResponse {
    paymentUrl?: string;
    merchantOrderId?: string;
    message?: string;
}

const PayButton = () => {
    const [amount, setAmount] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handlePayment = async (): Promise<void> => {
        if (!amount || Number(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post<PaymentResponse>(
                "http://localhost:8080/api/v1/payment/create",
                {
                    amount: Number(amount),
                }
            );

            console.log("Payment response:", response.data);

            if (response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl;
            } else {
                alert("PhonePe payment URL not received");
            }
        } catch (error: unknown) {
            console.error("Payment error:", error);

            if (axios.isAxiosError(error)) {
                console.error(
                    "Server response:",
                    error.response?.data
                );

                alert(
                    error.response?.data?.message ||
                    "Payment failed"
                );
            } else {
                alert("Payment failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full justify-center">
            <div className="w-full max-w-2xl rounded-lg p-4">


                {/* Input + Button */}
                <div className="flex flex-col gap-3 sm:flex-row">

                    <input
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        disabled={loading}
                        className="flex-1 rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="rounded-md bg-blue-500 px-8 py-3 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {loading
                            ? "Opening PhonePe..."
                            : amount
                            ? `Pay ₹${amount}`
                            : "Pay"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PayButton;
