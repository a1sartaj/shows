import axios from 'axios'


const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_TOKEN = process.env.TMDB_TOKEN

export const searchMoviesFromTMDB = async (query) => {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        params: {
            query
        }
    }
    )


    return response.data.results;
}

export const getMovieDetailsFromTMDB = async (tmdbId) => {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}`, {
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            'Content-Type': 'application/json'
        }
    })

    return response.data
}


export const getMovieTrailer = async (tmdbId) => {
    try {

        const response = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}/videos`, {
            headers: {
                Authorization: `Bearer ${TMDB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })

        return response.data

    } catch (error) {
        console.error('Error is : ', error)
        return 'Trainer not found'
    }
}