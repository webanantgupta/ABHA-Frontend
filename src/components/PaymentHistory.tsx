import { useEffect, useState } from "react";

import {
    FaHistory,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaRupeeSign,
    FaReceipt,
} from "react-icons/fa";

import { getPaymentHistory } from "../services/paymentApi";


interface Payment {
    id: number;
    merchant_order_id: string;
    phonepe_order_id: string | null;
    amount: string;
    status: string;
    response_data: any;
    created_at: string;
    updated_at: string;
}


const PaymentHistory = () => {

    const [payments, setPayments] =
        useState<Payment[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =====================================
    // FETCH PAYMENT HISTORY
    // =====================================

    const fetchPaymentHistory = async () => {

        try {

            setLoading(true);
            setError("");


            const data =
                await getPaymentHistory();


            console.log(
                "Payment History:",
                data
            );


            if (data.success) {

                setPayments(
                    data.payments
                );

            }


        } catch (error: any) {

            console.error(
                "PAYMENT HISTORY ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load payment history."
            );


        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchPaymentHistory();

    }, []);


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="
                flex
                min-h-[300px]
                items-center
                justify-center
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    text-gray-600
                ">

                    <FaHistory
                        className="animate-spin"
                    />

                    Loading payment history...

                </div>

            </div>

        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (error) {

        return (

            <div className="
                rounded-lg
                border
                border-red-200
                bg-red-50
                p-5
                text-red-600
            ">

                {error}

            </div>

        );

    }


    return (

        <div className="
            min-h-screen
            bg-slate-100
            px-4
            py-10
        ">

            <div className="
                mx-auto
                max-w-6xl
            ">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="
                    mb-8
                    flex
                    items-center
                    gap-4
                ">

                    <div className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-100
                    ">

                        <FaHistory
                            className="
                                text-xl
                                text-blue-600
                            "
                        />

                    </div>


                    <div>

                        <h1 className="
                            text-3xl
                            font-bold
                            text-gray-800
                        ">

                            Payment History

                        </h1>


                        <p className="
                            mt-1
                            text-gray-500
                        ">

                            View all your payments

                        </p>

                    </div>

                </div>


                {/* =====================================
                    NO PAYMENTS
                ===================================== */}

                {payments.length === 0 ? (

                    <div className="
                        rounded-xl
                        bg-white
                        p-10
                        text-center
                        shadow
                    ">

                        <FaReceipt
                            className="
                                mx-auto
                                mb-4
                                text-4xl
                                text-gray-300
                            "
                        />

                        <h2 className="
                            text-xl
                            font-semibold
                            text-gray-700
                        ">

                            No payments yet

                        </h2>


                        <p className="
                            mt-2
                            text-gray-500
                        ">

                            Your payment history will
                            appear here.

                        </p>

                    </div>

                ) : (


                    /* =====================================
                       PAYMENT TABLE
                    ===================================== */

                    <div className="
                        overflow-hidden
                        rounded-xl
                        bg-white
                        shadow
                    ">

                        <div className="
                            overflow-x-auto
                        ">

                            <table className="
                                w-full
                                min-w-[800px]
                            ">

                                <thead className="
                                    bg-[#22448C]
                                    text-white
                                ">

                                    <tr>

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                        ">
                                            #
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                        ">
                                            Order ID
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                        ">
                                            Amount
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                        ">
                                            Status
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                        ">
                                            Date
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {payments.map(
                                        (payment, index) => (

                                            <tr
                                                key={
                                                    payment.id
                                                }
                                                className="
                                                    border-b
                                                    border-gray-100
                                                    hover:bg-gray-50
                                                "
                                            >

                                                {/* NUMBER */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    text-gray-600
                                                ">

                                                    {index + 1}

                                                </td>


                                                {/* ORDER ID */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <div className="
                                                        font-medium
                                                        text-gray-800
                                                    ">

                                                        {
                                                            payment.merchant_order_id
                                                        }

                                                    </div>


                                                    {payment.phonepe_order_id && (

                                                        <div className="
                                                            mt-1
                                                            text-xs
                                                            text-gray-400
                                                        ">

                                                            {
                                                                payment.phonepe_order_id
                                                            }

                                                        </div>

                                                    )}

                                                </td>


                                                {/* AMOUNT */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <div className="
                                                        flex
                                                        items-center
                                                        font-semibold
                                                        text-gray-800
                                                    ">

                                                        <FaRupeeSign
                                                            className="
                                                                mr-1
                                                                text-sm
                                                            "
                                                        />

                                                        {
                                                            (
                                                                Number(
                                                                    payment.amount
                                                                ) / 100
                                                            ).toFixed(2)
                                                        }

                                                    </div>

                                                </td>


                                                {/* STATUS */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <StatusBadge
                                                        status={
                                                            payment.status
                                                        }
                                                    />

                                                </td>


                                                {/* DATE */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    text-gray-600
                                                ">

                                                    {new Date(
                                                        payment.created_at
                                                    ).toLocaleString(
                                                        "en-IN",
                                                        {
                                                            dateStyle:
                                                                "medium",
                                                            timeStyle:
                                                                "short",
                                                        }
                                                    )}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};


// =====================================
// STATUS BADGE
// =====================================

interface StatusBadgeProps {
    status: string;
}


const StatusBadge = ({
    status,
}: StatusBadgeProps) => {

    const normalizedStatus =
        status.toUpperCase();


    if (
        normalizedStatus ===
        "SUCCESS"
    ) {

        return (

            <span className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-green-100
                px-3
                py-1
                text-sm
                font-semibold
                text-green-700
            ">

                <FaCheckCircle />

                Success

            </span>

        );

    }


    if (
        normalizedStatus ===
        "FAILED"
    ) {

        return (

            <span className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-red-100
                px-3
                py-1
                text-sm
                font-semibold
                text-red-700
            ">

                <FaTimesCircle />

                Failed

            </span>

        );

    }


    return (

        <span className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-yellow-100
            px-3
            py-1
            text-sm
            font-semibold
            text-yellow-700
        ">

            <FaClock />

            Pending

        </span>

    );

};


export default PaymentHistory;