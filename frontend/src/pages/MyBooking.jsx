import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import PageLoader from '../components/loaders/PageLoader'
import axiosInstance from '../lib/axiosInstance'

const MyBooking = () => {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)


  const fetchBookingHistory = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get('/api/booking/history', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log(response.data.data)
      setHistory(response.data.data)

    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookingHistory()
  }, [])

  return loading ? <PageLoader /> : (
    <div className='flex items-center flex-col gap-8 w-full max-w-7xl mx-auto px-2 lg:px-0' >
      <h1 className=' flex gap-4 items-center text-3xl md:text-4xl' >My Bookings</h1>

      <div className='flex w-full items-center flex-col gap-2' >

        {history?.map((his, index) => (
          <div key={index} className='flex justify-between gap-2 flex-wrap max-w-3xl bg-white w-full p-4 rounded-lg text-black' >
            {/*Left Side for Image  */}
            <img src={`https://image.tmdb.org/t/p/w500${his.posterPath}`} alt={his.title} className='w-32 aspect-[1/1] rounded-lg' />


            {/* Center Side */}
            <div className='text-base flex-1' >
              <h2 className='text-2xl md:text-3xl font-bold' >{his.title}</h2>

              <p className='text-gray-700 font-semibold' >{new Date(his.showDateTime).toLocaleString('en-IN')}</p>
              {/* <p className='text-gray-700 font-semibold' >24/02/2026 09:00:00 am</p> */}

              <p className='text-gray-700 font-semibold' >₹ {his.totalAmount}.00</p>

              <p className='text-gray-700 font-semibold' >{his.bookingId}</p>

            </div>

            <Link to={`/confirmed/${his.bookingId}`} className="bg-red-600 text-white  h-fit px-6 py-3 rounded-lg font-semibold hover:bg-red-700 mb-10">
              View Details
            </Link>
          </div>
        ))}



      </div>

    </div>

  )
}

export default MyBooking
