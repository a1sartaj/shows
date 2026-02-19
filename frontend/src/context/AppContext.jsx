import { createContext, useEffect, useState } from "react";
import { movieDetails, moviesGenre, movieShows } from "../assets/assets";


export const AppContext = createContext()

const AppProvider = ({ children }) => {

    const [movies, setMovies] = useState(movieDetails) // Fetch All Movies
    const [movieForHero, setMovieForHero] = useState(movieDetails[0]) // Fetch Movies only for Hero Section.
    const [selectedMovieTrailer, setSelectedMovieTrailer] = useState(movies[0].trailer) // This is for trailer trailer 0 always set default
    const [movieAllTrailers, setMovieAllTrailers] = useState(movies.slice(0, 3).map(movie => movie.trailer)) // This is all trailers
    const [genres, setGenres] = useState(moviesGenre) // This is list for movie genres
    const [movieShowsTime, setMovieShowsTime] = useState(movieShows) // This is list for movie shows time

    useEffect(() => {
        // console.log('Movie Details : ', movieDetails)
        // console.log('Movies : ', movies)
    }, [movies])

    const value = {
        movies,
        movieForHero, setMovieForHero,
        selectedMovieTrailer, setSelectedMovieTrailer,
        movieAllTrailers, setMovieAllTrailers,
        genres, setGenres,
        movieShowsTime, setMovieShowsTime,
        
    }


    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;