import { useEffect, useState } from 'react'
import Card from '../components/Card'
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axiosInstance';
import MovieCardSkeleton from '../components/loaders/MovieCardSkeleton';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Movies = () => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchMovies = async (page) => {
        try {

            setLoading(true)

            const response = await axiosInstance.get(`/api/movie/get-all-movies?page=${page}&limit=8`);

            setMovies(response.data.data)
            setPagination(response.data.pagination)

        } catch (error) {
            console.error("Fetch movies error : ", error);
            toast.error("Failed to fetch movies");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const pageFromURL = parseInt(searchParams.get('page') || 1);

        // Check if some one write like this page=abc
        if (isNaN(pageFromURL)) {
            setSearchParams({ page: 1 });
            return;
        }

        // if page is less than 0 or -1 number it covnert into page=1
        if (pageFromURL < 1) {
            setSearchParams({ page: 1 })
            return
        }

        // if page or pagefromurl that mean url change that's mean page also change
        if (pageFromURL !== page) {
            setPage(pageFromURL)
            window.scrollTo(0, 0)
        }
    }, [searchParams])

    useEffect(() => {
        fetchMovies(page)
    }, [page])


    useEffect(() => {
        if (!pagination.totalPages) return
        const pageFromURL = parseInt(searchParams.get('page') || 1);

        // If URL page cross the totalpage it covert into total page for in the url
        if (pageFromURL > pagination?.totalPages) {
            setSearchParams({ page: pagination?.totalPages })
        }

    }, [pagination])

    const handleNext = () => {
        if (page < pagination.totalPages) {
            setSearchParams({ page: page + 1 })
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setSearchParams({ page: page - 1 })
        }
    }

    return (
        <section className='w-full max-w-7xl mx-auto px-2 xl:px-0' >

            <h1 className="text-2xl font-bold mb-4">Movies</h1>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies?.map((movie) => (
                        <Card key={movie._id} movie={movie} />
                    ))}
                </div>
            )}



            {/* PAGINATION */}
            {pagination && (
                <div className="flex justify-center items-center gap-4 mt-10">

                    <button
                        disabled={!pagination.hasPrevPage}
                        onClick={handlePrev}
                        className="px-4 py-2 bg-surface rounded disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <span>
                        Page {pagination.currentPage} / {pagination.totalPages}
                    </span>

                    <button
                        disabled={!pagination.hasNextPage}
                        onClick={handleNext}
                        className="px-4 py-2 bg-surface rounded disabled:opacity-40"
                    >
                        Next
                    </button>

                </div>
            )}
        </section>
    )
}

export default Movies
