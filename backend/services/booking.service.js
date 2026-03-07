import bookingModel from "../models/booking.Model.js"



export const createBooking = async ({ session, userId, show, seats, amount }) => {

    seats = [...seats].sort()

    if (!Array.isArray(show.bookedSeats)) {
        show.bookedSeats = []
    }

    const seatConflict = seats.some(seat => show.bookedSeats.includes(seat))

    if (seatConflict) {
        throw new Error('Seat already booked')
    }

    show.bookedSeats.push(...seats)
    await show.save({ session })

    const booking = await bookingModel.create([{

        userId,
        movieId: show.movieId,
        showId: show._id,
        showDateTime: show.showDateTime,
        screen: show.screen,
        seats,
        language: show.language,
        format: show.format,
        totalAmount: amount
    }], { session })

    return booking[0];

}