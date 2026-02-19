import movieModel from "./models/movie.Model.js"
import mongoose from "mongoose"
import 'dotenv/config'
import { getMovieDetailsFromTMDB, getMovieTrailer } from "./services/tmdb.Service.js"




const updateTrailerAndRaiting = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI)

        const movies = await movieModel.find()

        for (let i = 0; i < movies.length; i++) {
            const tmdbMovie = await getMovieDetailsFromTMDB(movies[i].tmdbId);
            const tmdbMovieTrailer = await getMovieTrailer(movies[i].tmdbId);
            const officialTrailer = tmdbMovieTrailer.results.find(trailer => trailer.site === 'YouTube' && trailer.type === 'Trailer' && trailer.official === true)
            const trailer = officialTrailer ? [{ name: officialTrailer.name, key: officialTrailer.key }] : [];


            movies[i].rating = tmdbMovie.vote_average
            movies[i].popularity = tmdbMovie.popularity
            movies[i].trailer = trailer

            await movies[i].save();
        }


        console.log("successfully done")

    } catch (error) {
        console.log("Error is : ", error)
    }

}

updateTrailerAndRaiting()