import express from 'express'
import { create, deleteUser, getAllUser, getMe, login, update } from '../controllers/auth.Controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';

const authRouter = express.Router();

authRouter.get('/me', authMiddleware, getMe)
authRouter.post('/login', login)
authRouter.post('/sign-up', create)
authRouter.put('/update/:userId', authMiddleware, adminMiddleware, update)
authRouter.get('/get-all-users', authMiddleware, adminMiddleware, getAllUser)
authRouter.delete('/delete/:userId', authMiddleware, adminMiddleware, deleteUser)


export default authRouter