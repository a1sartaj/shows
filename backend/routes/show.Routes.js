import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import adminMiddleware from '../middleware/admin.middleware.js'
import { createShow, getAvailableDates, getShowsByDate } from '../controllers/show.Controller.js'



const showRouter = express.Router()

showRouter.post('/admin/create', authMiddleware, adminMiddleware, createShow)
showRouter.get('/available-dates/:movieId', getAvailableDates)
showRouter.get('/by-date', getShowsByDate)

export default showRouter