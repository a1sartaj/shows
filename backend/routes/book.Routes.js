import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { bookingDetails, bookingHistory, createBooking } from '../controllers/booking.Controller.js'

const bookingRouter = express.Router()

bookingRouter.post('/book', authMiddleware, createBooking)
bookingRouter.get('/history', authMiddleware, bookingHistory)
bookingRouter.get('/:bookingId', authMiddleware, bookingDetails)

export default bookingRouter