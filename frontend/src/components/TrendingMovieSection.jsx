import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axiosInstance'
import Card from './Card'

const TrendingMovieSection = () => {
    const [trending, setTrending] = useState([])


    const fetchTrendingMovie = async () => {
        try {

            const response = await axiosInstance.get('/api/movie/get-trending-movie')

            setTrending(response.data.data)

        } catch (error) {
            toast.error('Failed to fetch trending movies')
        }
    }

    useEffect(() => {
        fetchTrendingMovie()
    }, [])

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' > 

            {/* its title has been written in Home.jsx like Treding Movies */}

            {
                trending?.map((trend, index) => (
                    <Card key={index} movie={trend} />
                ))
            }
        </div>
    )
}

export default TrendingMovieSection
