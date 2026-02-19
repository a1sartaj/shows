import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axiosInstance';
import PageLoader from '../components/loaders/PageLoader';

const BookingDetails = () => {

  const { bookingId } = useParams()
  const [bookingDetails, setBookingDetails] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchBookingDetails = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get(`/api/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setBookingDetails(response.data.data)

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Booking details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookingDetails()
    scrollTo(0, 0)
  }, [bookingId])


  return loading ? <PageLoader /> : (
    <div className=' flex flex-col items-center w-full max-w-7xl mx-auto px-2 lg:px-0 ' >

      <h1 className=' flex gap-4 items-center text-3xl md:text-4xl' > <span><FaCheckCircle className='text-green-500' /></span> Booking Confirmed!</h1>
      <p className='text-text-muted'>Your booking has been successfully confirmed.</p>

      <div className='flex justify-between gap-4 md:gap-0 flex-wrap items-start my-12 w-full max-w-4xl bg-white text-black p-2 md:p-4 rounded-lg md:rounded-3xl' >
        {/*Left Side for Image  */}
        <img src={`https://image.tmdb.org/t/p/w500${bookingDetails.posterPath}`} alt={bookingDetails.title} className='w-56 aspect-[2/3] rounded-lg' />

        {/* Center side for ticket details */}
        <div className='' >
          <h2 className='text-3xl md:text-4xl font-bold border-b bg py-2 mb-4  border-gray-500' >{bookingDetails.title}</h2>
          <div className='flex gap-2 md:gap-8 text-base md:text-lg' >
            <p className='font-semibold' >Date & Time : </p>
            <p className='text-gray-700 font-semibold flex-1' >{new Date(bookingDetails.showDateTime).toLocaleString('en-IN')}</p>
            {/* <p className='text-gray-700 font-semibold' >Feb 24, 2026 | 9:00 AM</p> */}
          </div>

          <div className='flex gap-2 md:gap-8 text-base md:text-lg' >
            <p className='font-semibold' >Screen : </p>
            <p className='text-gray-700 font-semibold flex-1' >{bookingDetails.screen}</p>
          </div>

          <div className='flex gap-2 md:gap-8 text-base md:text-lg' >
            <p className='font-semibold' >Language : </p>
            <p className=' text-gray-700 font-semibold flex-1' >{bookingDetails.language}</p>
          </div>

          <div className='flex gap-2 md:gap-8 text-base md:text-lg' >
            <p className='font-semibold' >Format : </p>
            <p className='text-gray-700 font-semibold flex-1' >{bookingDetails.format}</p>
          </div>

          <div className='flex gap-2 md:gap-8 text-base md:text-lg' >
            <p className='font-semibold' >Seats : </p>
            <p className='text-gray-700 font-semibold flex-1' >
              {
                bookingDetails.seats?.map((seat, index) => (
                  <span key={index}> {seat}, </span>
                ))
              }
            </p>
          </div>

          <div className='flex gap-2 md:gap-8 text-base md:text-lg' >
            <p className='font-semibold' >Total Price : </p>
            <p className='text-gray-700 font-semibold flex-1' >₹ {bookingDetails.totalAmount}.00</p>
          </div>

          <div className='flex gap-2 md:gap-8 text-base md:text-xl border-t border-b py-2 mt-4 border-gray-500' >
            <p className='font-semibold' >Booking Id :  </p>
            <p className='text-gray-700 font-semibold flex-1' >{bookingDetails.bookingId}</p>
          </div>


        </div>

        {/* Right Side for Ticket QR */}
        <div className='border flex flex-col items-center rounded-lg shadow-lg  p-4 ' >
          <QRCodeCanvas value={`https://shows.a1sartaj.in/confirmed/${bookingDetails.bookingId}`} />
          <div className='px-8 py-2 text-white font-bold bg-green-500 rounded-lg' >
            Confirnmend
          </div>
        </div>


        <p className='text-text-muted' >Show this QR at theatre entry No refund after show time Enjoy your movie 🍿 </p>

      </div>
      <Link to={'/'} className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 mb-10">
        Back to Home
      </Link>


    </div>
  )
}

export default BookingDetails
