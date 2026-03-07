import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import showModel from "../models/show.Model.js";
import { nanoid } from 'nanoid'
import { createBooking } from "../services/booking.service.js";



export const createPayment = async (req, res) => {

    try {

        const { showId, seats } = req.body;
        const userId = req.user.id;

        if (!showId || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid data' })
        }

        const show = await showModel.findById(showId)
        if (!show) return res.status(404).json({ success: false, message: 'Show not found' })

        const alreadyExists = seats.some(seat => show.bookedSeats.includes(seat))

        if (alreadyExists) return res.status(400).json({ success: false, message: 'Seats already reserved' })

        const existingPayment = await Payment.findOne({
            userId,
            showId,
            seats: { $all: seats },
            status: 'CREATED'
        })

        if (existingPayment) {
            return res.status(400).json({ success: false, message: 'Payment already in progress...' })
        }


        const amount = show.price * seats.length;

        const payment = await Payment.create({
            userId,
            showId,
            amount,
            seats: seats.sort(),
            paymentId: `pay_${nanoid(10)}`,

        })

        res.status(201).json({
            success: true, message: 'Payment create successfully',
            payment: {
                paymentId: payment.paymentId,
                amount: payment.amount,
            }
        })

    } catch (error) {
        console.error("Create payment error : ", error)
        return res.status(500).json({ success: false, message: 'Failed to create payment' })
    }
}

export const verifyPayment = async (req, res) => {

    const session = await mongoose.startSession()
    session.startTransaction();

    try {

        const userId = req.user.id;
        const { paymentId, status } = req.body;

        if (!["SUCCESS", "FAILED"].includes(status)) {
            throw new Error('Invalid payment status')
        }

        const payment = await Payment.findOne({ paymentId, userId }).session(session);
        if (!payment) throw new Error("Payment not found")


        if (payment.status !== 'CREATED') {
            throw new Error('Payment already proccessed')
        }

        if (status === "FAILED") {
            payment.status = "FAILED"
            await payment.save({ session })
            await session.commitTransaction();
            session.endSession()
            return res.status(400).json({ success: false, message: 'Payment failed' })
        }

        const show = await showModel.findById(payment.showId).session(session);
        if (!show) throw new Error('show not found')

        const booking = await createBooking({
            session, userId, show, seats: payment.seats, amount: payment.amount
        })

        payment.status = 'SUCCESS';
        await payment.save({ session })

        await session.commitTransaction();
        session.endSession()

        console.log('Successfully payment')

        return res.status(201).json({ success: true, message: 'Payment successfully paid ', bookingId: booking._id })


    } catch (error) {
        console.error("Verify Payment error : ", error)
        await session.abortTransaction()
        session.endSession()
        return res.status(500).json({ success: false, message: error.message || 'Failed to verify payment' })
    }
}