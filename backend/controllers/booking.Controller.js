import mongoose from "mongoose"
import bookingModel from "../models/booking.Model.js";
import showModel from "../models/show.Model.js";
import movieModel from "../models/movie.Model.js";




export const createBooking = async (req, res) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    try {

        const userId = req.user.id;
        const { showId } = req.body;
        let { seats } = req.body;

        const show = await showModel.findById(showId).session(session)

        if (!show) {
            await session.abortTransaction()
            session.endSession()
            return res.status(404).json({ success: false, message: 'Show not found' })
        }

        const alreadyBooked = seats.some((seat) => show.bookedSeats.includes(seat))

        if (alreadyBooked) {
            await session.abortTransaction()
            session.endSession()
            return res.status(400).json({ success: false, message: 'One or more seats are already booked' })
        }

        show.bookedSeats.push(...seats)
        await show.save({ session })

        const totalAmount = seats.length * show.price

        const booking = await bookingModel.create(
            [
                {
                    userId,
                    showId,
                    movieId: show.movieId,
                    seats,
                    totalAmount,
                    showDateTime: show.showDateTime,
                    screen: show.screen,
                    language: show.language,
                    format: show.format,
                },
            ],
            { session }
        )

        await session.commitTransaction()
        session.endSession()

        return res.status(201).json({ success: true, message: 'Booking created successfully', data: booking[0] })

    } catch (error) {
        console.error('Creating booking error : ', error)
        return res.status(500).json({ success: false, message: 'Failed to create booking' })
    }
}

export const bookingDetails = async (req, res) => {
    try {

        const { bookingId } = req.params;

        const bookingDetails = await bookingModel.findById(bookingId)
        const movieDetails = await movieModel.findById(bookingDetails.movieId)

        const data = {
            title: movieDetails.title,
            posterPath: movieDetails.posterPath,
            seats: bookingDetails.seats,
            totalAmount: bookingDetails.totalAmount,
            showDateTime: bookingDetails.showDateTime,
            screen: bookingDetails.screen,
            language: bookingDetails.language,
            format: bookingDetails.format,
            bookingId: bookingDetails._id
        }

        return res.status(200).json({ success: true, data })

    } catch (error) {
        console.error("Booking details error : ", error)
        return res.status(500).json({ success: false, message: 'Failed to fetch booking details' })
    }
}

export const bookingHistory = async (req, res) => {
    try {

        const userId = req.user.id;

        const bookingHistory = await bookingModel.find({ userId: userId }).sort({ createdAt: -1 })

        const data = []

        for (let i = 0; i < bookingHistory.length; i++) {
            const movieDetails = await movieModel.findById(bookingHistory[i].movieId)
            data.push({
                title: movieDetails.title,
                showDateTime: bookingHistory[i]?.showDateTime,
                totalAmount: bookingHistory[i].totalAmount,
                bookingId: bookingHistory[i]._id,
                posterPath: movieDetails.posterPath,
            })
        }

        return res.status(200).json({ success: true, message: 'Successfully fetch booking history', data: data })

    } catch (error) {
        console.error("Booking History Error : ", error)
        return res.status(500).json({ success: false, message: "Failed to fetch booking history" })
    }
} 