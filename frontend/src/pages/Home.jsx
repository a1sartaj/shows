import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axiosInstance'
import { minuteToHours } from '../lib/minuteToHours'
import { fullDataToYear } from '../lib/fullDataToYear'
import { useNavigate } from 'react-router-dom'
import MovieTrailerSection from '../components/MovieTrailerSection'
import TrendingMovieSection from '../components/TrendingMovieSection'
import LetestMovie from '../components/LetestMovie'

const Home = () => {

    const [movies, setMovies] = useState([])
    const [index, setIndex] = useState(0)
    const navigate = useNavigate()

    const getMovieForHero = async () => {
        try {
            const response = await axiosInstance.get('/api/movie/get-for-hero')
            setMovies(response.data.data)   // expect array of 3 movies
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load hero movies')
        }
    }

    useEffect(() => {
        getMovieForHero()
    }, [])

    // auto slide every 7 sec
    useEffect(() => {
        if (movies.length === 0) return

        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % movies.length)
        }, 7000)

        return () => clearInterval(interval)
    }, [movies])

    if (!movies.length) return null

    const heroMovie = movies[index]

    return (
        <div className='w-full'>

            {/* =======Hero Section======== */}
            <section className="relative flex items-center justify-center  h-screen w-full -mt-16 md:-mt-24">

                {/* Background Image */}
                <img
                    src={`https://image.tmdb.org/t/p/original${heroMovie.backdropPath}`}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    alt=""
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/70 z-10" />

                {/* Content */}
                <div className='relative z-20 flex items-center  justify-between  w-full px-2 xl:px-0 max-w-7xl mx-auto'>

                    {/* =======Left Side Content */}
                    <div className='flex-1/2 max-w-2xl text-white' >

                        <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-4' >{heroMovie.title}</h1>

                        <p className='text-sm md:text-base text-gray-300 mb-4 line-clamp-3' >{heroMovie.overview}</p>

                        <p className='text-sm md:text-base text-gray-200 mb-4' >{`${minuteToHours(heroMovie.runtime)} • ${fullDataToYear(heroMovie.releaseDate)}`}</p>

                        <div className="flex flex-wrap gap-2 mb-6">

                            {heroMovie?.genres.map((genre, index) => (
                                <span key={index} className="bg-white/10 px-3 py-1 rounded text-sm">{genre.name}</span>
                            ))}
                        </div>

                        <div className='flex gap-4'>
                            <button onClick={() => navigate(`/movie/${heroMovie._id}`)} className='bg-button-primary hover:bg-glass-bg px-6 py-2 rounded-lg font-semibold shadow-md transition' >Book Now</button>

                            <button className='bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-semibold backdrop-blur transition' >Watch Trailer</button>
                        </div>

                    </div>

                    {/* ========Right Side content */}
                    <div className='hidden md:flex flex-1 justify-end' >
                        {/* Poster */}
                        <img
                            src={
                                heroMovie.posterPath
                                    ? `https://image.tmdb.org/t/p/w500${heroMovie.posterPath}`
                                    : "/default-movie-poster.jpg"
                            }
                            alt={heroMovie.title}
                            className="w-72 lg:w-80 aspect-[2/3] rounded-lg shadow-2xl border border-white/10"
                        />
                    </div>
                </div>

            </section>


            {/* ==========Trailer section============== */}
            <section className="w-full   flex-wrap max-w-7xl mx-auto py-20 px-2 xl:px-0 ">
                <MovieTrailerSection />
            </section>

            {/* =========Trending section=========== */}
            <section className="w-full flex flex-col items-center justify-center max-w-7xl mx-auto py-20 px-2 xl:px-0">

                <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>

                < TrendingMovieSection />
            </section>

            {/* =========== latest section ========== */}
            <section className="w-full flex flex-col items-center justify-center max-w-7xl mx-auto py-20 px-2 xl:px-0">
                <h1 className="text-2xl font-bold mb-4">Letest Movies</h1>

                <LetestMovie />

            </section>

        </div>

    )
}

export default Home
