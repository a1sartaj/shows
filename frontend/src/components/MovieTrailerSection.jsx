import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axiosInstance'

const MovieTrailerSection = () => {

    const [trailers, setTrailers] = useState([])
    const [currectTrailer, setCurrectTrailer] = useState(null)

    const fetchMovieTrailer = async () => {
        try {

            const response = await axiosInstance.get('/api/movie/get-for-trailer')

            // console.log(response.data.data.map(trail => trail.trailer[0]?.key))
            setTrailers(response.data.data.map(trail => trail.trailer[0]?.key))  // ['key', 'key', 'key'] trailer id store like this
            // console.log(response.data.data[0].trailer[0]?.key) // only first key store
            setCurrectTrailer(response.data.data[0].trailer[0]?.key)

        } catch (error) {
            toast.error('Failed to fetch trailer')
        }
    }

    useEffect(() => {
        fetchMovieTrailer()
    }, [])

    return (
        <div className='flex flex-col items-center justify-center gap-2 w-full ' >


            <h1 className="text-2xl font-bold mb-4 ">Watch Trailer</h1>

            <iframe
                className='aspect-[16/9] w-full max-w-6xl rounded-lg' src={`https://www.youtube.com/embed/${currectTrailer}`}
                title="Movie Trailer"
                loading="lazy"
                allow="accelerometer; gyroscope; picture-in-picture; fullscreen"
            />

            <div className='flex gap-4 flex-wrap' >
                {trailers?.map((trailer, index) => {

                    
                    return trailer ? (
                        <img
                            key={index}
                            className={`rounded-lg w-full max-w-20 md:max-w-52 ${currectTrailer === trailer ? 'border scale-105' : ""} transition-all  duration-75 hover:scale-105 cursor-pointer`} onClick={() => setCurrectTrailer(trailer)}
                            src={`https://img.youtube.com/vi/${trailer}/mqdefault.jpg`}
                            alt="Movie Trailer"
                        />
                    ) : null
                })}
            </div>
        </div>
    )
}

export default MovieTrailerSection
