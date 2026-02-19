import { getMovieDetailsFromTMDB, searchMoviesFromTMDB } from "../services/tmdb.Service.js";




export const searchMovies = async (req, res) => {
    try {

        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ success: false, message: 'Search query is required' })
        }

        const movies = await searchMoviesFromTMDB(query)

        return res.status(200).json({ success: true, data: movies })

    } catch (error) {
        console.error("TMDB search error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to search movies",
        });
    }
}

export const getMovieDetails = async (req, res) => {
    try {

        const {tmdbId} = req.params;

        const movieDetails = await getMovieDetailsFromTMDB(tmdbId);

        return res.status(200).json({success : true, data : movieDetails})

    } catch (error) {
        console.error("TMDB get error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get movie details",
        });
    }
}

