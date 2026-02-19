import express from 'express'
import { addMovieByTMDBId, getAllMovies, getMovieById, getThreeLetestMovie, getThreeMovieForTrailer, getThreeMovies, getTrendingMovie } from '../controllers/movie.Controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';


const movieRouter = express.Router();

movieRouter.post('/admin/add-movie', authMiddleware, adminMiddleware, addMovieByTMDBId)
movieRouter.get('/get-all-movies', getAllMovies)
movieRouter.get('/get-movie/:id', getMovieById)
movieRouter.get('/get-for-hero', getThreeMovies)
movieRouter.get('/get-for-trailer', getThreeMovieForTrailer)
movieRouter.get('/get-trending-movie', getTrendingMovie)
movieRouter.get('/get-letest-movie', getThreeLetestMovie)

export default movieRouter; 