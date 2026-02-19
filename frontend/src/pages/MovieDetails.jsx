import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import { minuteToHours } from "../lib/minuteToHours";

const MovieDetails = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const fetchMovie = async () => {
        try {
            setLoading(true);

            const res = await axiosInstance.get(`/api/movie/get-movie/${id}`);
            setMovie(res.data.data);

        } catch (error) {
            console.error("Fetch movie error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading movie...
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Movie not found
            </div>
        );
    }

    const year = movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : "N/A";

    const genres = movie?.genres?.map((g) => g.name).join(" | ") || "Unknown";

    return (
        <section className="w-full text-white -mt-14 md:-mt-24">

            {/* ===== BACKDROP ===== */}
            <div className="relative w-full h-[65vh]">
                <img
                    src={
                        movie.backdropPath
                            ? `https://image.tmdb.org/t/p/original${movie.backdropPath}`
                            : "/default-backdrop.jpg"
                    }
                    alt={movie.title}
                    className="w-full h-full object-top object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70" />

            </div>

            {/* ===== CONTENT ===== */}
            <div className="max-w-6xl mx-auto px-4 -my-24 relative z-10">

                {/* Poster + Basic Info */}
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Poster */}
                    <img
                        src={
                            movie.posterPath
                                ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                                : "/default-movie-poster.jpg"
                        }
                        alt={movie.title}
                        className="w-56 aspect-[2/3] rounded-lg shadow-lg"
                    />

                    {/* Info */}
                    <div className="flex-1">

                        <h1 className="text-3xl font-bold">
                            {movie.title} ({year})
                        </h1>

                        <p className="text-gray-400 mt-2">
                            {genres}
                        </p>

                        <p className="text-gray-400 mt-1">
                            {minuteToHours(movie.runtime)} • {movie.originalLanguage?.toUpperCase()}
                        </p>

                        {/* Price + Button */}
                        <div className="mt-6 flex items-center gap-4">
                            <button onClick={() => navigate(`/select-seat/${movie._id}`)} className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700">
                                Book Now
                            </button>

                            <p className="text-sm text-gray-400">
                                Coming Soon
                            </p>
                        </div>
                    </div>
                </div>

                {/* ===== OVERVIEW ===== */}
                <div className="mt-10 mb-24">
                    <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                    <p className="text-gray-300 leading-relaxed">
                        {movie.overview || "No description available."}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default MovieDetails;
