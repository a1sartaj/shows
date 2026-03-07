import React from 'react'
import { useEffect } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const PaymentModel = ({ payment, onClose, onSubmit }) => {

    useEffect(() => {
        console.log(payment)
    }, [payment])

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6 relative">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-gray-900">
                    Complete Payment
                </h2>

                <p className="text-center text-sm text-gray-500">
                    Payment ID: {payment?.paymentId}
                </p>

                {/* Amount */}
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-gray-500 text-sm">Amount</p>
                    <p className="text-3xl font-bold text-red-600">
                        ₹ {payment?.amount}
                    </p>
                </div>

                <form onSubmit={onSubmit} className='space-y-6'>

                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">
                            Name on Card
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            className="mt-1 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                        />
                    </div>

                    {/* Card Number */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">
                            Card Number
                        </label>
                        <input
                            type="text"
                            name="card"
                            required
                            maxLength={16}
                            placeholder="1234 5678 9012 3456"
                            className="mt-1 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                        />
                    </div>

                    {/* Expiry + CVV */}
                    <div className="flex gap-4">

                        <div className="flex flex-col w-full">
                            <label className="text-sm font-medium text-gray-700">
                                Expiry
                            </label>
                            <input
                                type="text"
                                name="expiry"
                                required
                                placeholder="MM/YY"
                                maxLength={5}
                                className="mt-1 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="text-sm font-medium text-gray-700">
                                CVV
                            </label>
                            <input
                                type="password"
                                name="cvv"
                                required
                                maxLength={3}
                                placeholder="123"
                                className="mt-1 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                            />
                        </div>

                    </div>

                    {/* Pay Button */}
                    <button
                        className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
                    >
                        Pay ₹ {payment?.amount}
                    </button>

                </form>

                <p className="text-xs text-gray-400 text-center">
                    Demo payment for portfolio project
                </p>

            </div>

        </div>
    )
}

export default PaymentModel
