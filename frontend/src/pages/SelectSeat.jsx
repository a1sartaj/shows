import React, { useEffect, useState } from "react";
import SeatLayout from "../components/SeatLayout";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const SelectSeat = () => {

    const { movieId } = useParams()
    const [dates, setDates] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [shows, setShows] = useState([])
    const [selectedShow, setSelectedShow] = useState('')
    const [selectedSeats, setSelectedSeats] = useState([])
    const navigate = useNavigate()

    // Fetching dates from backend
    const fetchDates = async () => {
        try {

            const response = await axiosInstance.get(`/api/show/available-dates/${movieId}`)
            setDates(response.data.data)
        } catch (error) {
            toast.error(error.response.data.message)
            navigate(-1)
        }
    }

    const fetchShow = async (date) => {
        try {

            const response = await axiosInstance.get(`/api/show/by-date?movieId=${movieId}&date=${date}`)

            setShows(response.data.data)
            console.log(response.data.data)

        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch movie, Please try again later')
        }
    }


    const toggleSeat = (seat) => {
        if (selectedShow?.bookedSeats?.includes(seat)) return;

        setSelectedSeats(prev => prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat])
    }

    const handleBook = async () => {
        try {
            const response = await axiosInstance.post(
                "/api/booking/book",
                {
                    showId: selectedShow._id,
                    seats: selectedSeats,
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            toast.success(response.data.message);
            setSelectedSeats([]);
            fetchShow(selectedDate); // refresh booked seats
            navigate(`/confirmed/${response.data.data._id}`)
            // console.log(response.data.data._id)

        } catch (error) {
            toast.error(error.response?.data?.message || "Booking failed");
        }
    };


    useEffect(() => {
        fetchDates();
    }, [])

    return (
        <section className="w-full max-w-6xl mx-auto p-3 sm:p-4">

            <div className="flex flex-col md:flex-row gap-4 rounded-lg p-3 sm:p-4">

                {/* Date Selection */}
                <div className="w-full md:w-1/4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3">Select Date</h2>

                    <div className="flex md:flex-col flex-wrap gap-2">
                        {
                            dates?.map((date, index) => (
                                <button
                                    onClick={() => {
                                        setSelectedDate(date)
                                        setSelectedShow(null)
                                        setSelectedSeats([])
                                        fetchShow(date)
                                    }}
                                    className={`py-2 px-8 rounded-lg ${selectedDate === date ? "bg-button-primary" : "bg-glass-bg"} cursor-pointer`} key={index} >
                                    {date}
                                </button>
                            ))
                        }
                    </div>
                </div>

                {/* Seat Section */}
                {selectedDate && (
                    <div className="w-full md:w-3/4">
                        <h2 className="text-lg sm:text-xl font-semibold mb-3">Select Time</h2>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {shows?.map((show, timeIndex) => (
                                <button
                                    onClick={() => {
                                        setSelectedShow(show)
                                        setSelectedSeats([])
                                    }}
                                    key={timeIndex}
                                    className={`py-2 px-8 rounded-lg ${selectedShow?._id === show._id ? "bg-button-primary" : "bg-glass-bg"} cursor-pointer`}
                                >
                                    {new Date(show.showDateTime).toLocaleTimeString('en-IN', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </button>
                            ))}
                        </div>

                        {/* ======Seat Grid=========== */}
                        {selectedShow?._id && <>
                            <h2 className="text-lg sm:text-xl font-semibold mb-3">Select Seats</h2>

                            <SeatLayout
                                totalSeats={selectedShow.totalSeats}
                                onSeatClick={toggleSeat}
                                selectedShow={selectedShow}
                                selectedSeats={selectedSeats}
                            />
                        </>}


                        {/* ===== SUMMARY ===== */}
                        {selectedSeats?.length > 0 && (
                            <div className="mt-8">
                                <div className="mb-6" >
                                    Seats:{" "}
                                    {selectedSeats?.map((s) => <span key={s}>{`${s}, `}</span>)}
                                </div>

                                <div className="mb-6">Total: ₹ {selectedSeats.length * selectedShow.price}</div>

                                <button
                                    onClick={handleBook}
                                    className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
                                >
                                    Book Now
                                </button>
                            </div>
                        )}
                    </div>
                )}


            </div>
        </section>
    );
};

export default SelectSeat;
