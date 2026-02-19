import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import MovieCardSkeleton from "../../components/loaders/MovieCardSkeleton";

const AdminMovies = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)

    const fetchMovies = async () => {
        try {

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
        fetchMovies();
    }, [page])

    return (
        <section className="w-full max-w-6xl mx-auto text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Movies</h1>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <div
                            key={movie._id}
                            onClick={() => navigate(`/admin/movies/${movie._id}/add-show`)}
                            className="cursor-pointer border rounded-lg p-2 hover:bg-gray-800"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w342${movie.posterPath}`}
                                alt={movie.title}
                                className="w-full aspect-[2/3] object-cover rounded"
                            />
                            <p className="mt-2">{movie.title}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* PAGINATION */}
            {pagination && (
                <div className="flex justify-center items-center gap-4 mt-10">

                    <button
                        disabled={!pagination.hasPrevPage}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-4 py-2 bg-surface rounded disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <span>
                        Page {pagination.currentPage} / {pagination.totalPages}
                    </span>

                    <button
                        disabled={!pagination.hasNextPage}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-2 bg-surface rounded disabled:opacity-40"
                    >
                        Next
                    </button>

                </div>
            )}
        </section>
    );
};

export default AdminMovies;
