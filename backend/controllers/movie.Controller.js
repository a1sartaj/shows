import movieModel from "../models/movie.Model.js";
import { getMovieDetailsFromTMDB, getMovieTrailer } from "../services/tmdb.Service.js";


export const addMovieByTMDBId = async (req, res) => {
    try {
        const { tmdbId } = req.body;

        if (!tmdbId) {
            return res.status(400).json({ success: false, message: "tmdbId is required" })
        }

        const existingMovie = await movieModel.findOne({ tmdbId })
        if (existingMovie) {
            return res.status(409).json({ success: false, message: 'Movie already exists' })
        }

        const tmdbMovie = await getMovieDetailsFromTMDB(tmdbId);
        const tmdbMovieTrailer = await getMovieTrailer(tmdbId);

        // console.log(tmdbMovieTrailer)

        const officialTrailer = tmdbMovieTrailer.results.find(trailer => trailer.site === 'YouTube')
        const trailer = officialTrailer ? [{ name: officialTrailer.name, key: officialTrailer.key }] : [];


        const movie = await movieModel.create({
            tmdbId: tmdbMovie.id,
            title: tmdbMovie.title,
            overview: tmdbMovie.overview,
            originalLanguage: tmdbMovie.original_language,
            releaseDate: tmdbMovie.release_date,
            posterPath: tmdbMovie.poster_path,
            backdropPath: tmdbMovie.backdrop_path,
            runtime: tmdbMovie.runtime,
            genres: tmdbMovie.genres,
            rating: tmdbMovie.vote_average,
            popularity: tmdbMovie.popularity,
            trailer,
            createdBy: req.user.id, // admin id
        })

        return res.status(201).json({ success: true, message: 'Movied added successfully', data: movie })

    } catch (error) {
        console.error("Add movie by TMDB error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add movie",
        });
    }
}

export const getAllMovies = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const skip = (page - 1) * limit;

        const movies = await movieModel.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const totalMovies = await movieModel.countDocuments();

        const totalPages = Math.ceil(totalMovies / limit);

        return res.status(200).json({
            success: true,
            message: "Movies fetched successfully",
            data: movies,
            pagination: {
                totalPages,
                totalMovies,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            }
        })

    } catch (error) {
        console.error("Get all movies error : ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get all movies",
        });
    }
}

export const getThreeMovies = async (req, res) => {
    try {

        const movies = await movieModel.find().limit(3).sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            message: 'Successfully fetch three movies',
            data: movies
        })

    } catch (error) {
        console.error('Error is : ', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to get three movies'
        })
    }
}

export const getThreeMovieForTrailer = async (req, res) => {
    try {

        const movieTrailer = await movieModel.find().select("trailer -_id").limit(3).sort({ createdAt: -1 })

        // console.log(movieTrailer)

        return res.status(200).json({ success: true, message: "Successfully fetch movie ", data: movieTrailer })

    } catch (error) {
        console.error('Error is : ', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to get three trailer movies'
        })
    }
}

export const getMovieById = async (req, res) => {
    try {

        const { id } = req.params;

        const movie = await movieModel.findById(id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Movie fetched successfully",
            data: movie
        })

    } catch (error) {
        console.error("Get movie by id error : ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get movie by id",
        });
    }
}

export const getTrendingMovie = async (req, res) => {
    try {

        const trendingMovies = await movieModel.find({ isActive: true, }).sort({ popularity: -1 }).limit(4)

        return res.status(200).json({ success: true, message: 'Treding movies fetch successfully', data: trendingMovies })

    } catch (error) {
        console.error("Get Trending Movie Error : ", error)
        return res.status(500).json({ success: false, message: 'Failed to fetch trending movies' })
    }
}

export const getThreeLetestMovie = async (req, res) => {
    try {

        const letestMovie = await movieModel.find().sort({ createdAt: -1 }).limit(4)

        return res.status(200).json({ success: true, message: 'Letest movies fetch successfully', data : letestMovie })

    } catch (error) {
        console.error('Get Three letest movie is error : ', error)
        return res.status(500).json({ success: false, message: 'Failed to fetch letest movies' })
    }
}