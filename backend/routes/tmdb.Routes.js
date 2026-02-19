import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';
import { getMovieDetails, searchMovies } from '../controllers/tmdb.Controller.js';

const tmdbRouter = express.Router();

tmdbRouter.get('/admin/tmdb/search', authMiddleware, adminMiddleware, searchMovies)
tmdbRouter.get('/admin/tmdb/movie/:tmdbId', authMiddleware, adminMiddleware, getMovieDetails)

export default tmdbRouter;

