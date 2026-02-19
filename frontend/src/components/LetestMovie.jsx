import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axiosInstance'
import Card from './Card'

const LetestMovie = () => {

    const [letetMovies, setLetestMovies] = useState([])

    const fetchLetestMovie = async () => {
        try {

            const response = await axiosInstance('/api/movie/get-letest-movie')

            setLetestMovies(response.data.data)
            
        } catch (error) {
            toast.error('Failed to fetch letest movies')
        }
    }

    useEffect(() => {
        fetchLetestMovie()
    },[])

  return (
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' > 

            {/* its title has been written in Home.jsx like Treding Movies */}

            {
                letetMovies?.map((trend, index) => (
                    <Card key={index} movie={trend} />
                ))
            }
        </div>
  )
}

export default LetestMovie
