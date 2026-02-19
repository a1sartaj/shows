import { useNavigate } from "react-router-dom";
import { minuteToHours } from "../lib/minuteToHours";

const Card = ({ movie }) => {
    const navigate = useNavigate();

    const handleOpenMovie = () => {
        navigate(`/movie/${movie?._id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const year = movie?.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : "N/A";

    const genres =
        movie?.genres?.slice(0, 2).map((g) => g.name).join(" | ") || "Unknown";

    const runtime = movie?.runtime
        ? minuteToHours(movie.runtime)
        : "";

    return (
        <div className="border rounded-lg p-1 md:p-3 flex flex-col justify-between">

            {/* ===== TOP SECTION ===== */}
            <div>

                {/* Poster */}
                <div
                    onClick={handleOpenMovie}
                    className="overflow-hidden rounded-lg cursor-pointer"
                >
                    <img
                        className="w-full aspect-[2/3] object-cover transition-all duration-300 hover:scale-110"
                        src={
                            movie?.posterPath
                                ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                                : "/default-movie-poster.jpg"
                        }
                        alt={movie?.title || "Movie poster"}
                    />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mt-3 line-clamp-2">
                    {movie?.title || "Untitled"}
                </h3>

                {/* Info */}
                <p className="text-sm text-gray-400 mt-2">
                    {year} {genres && `• ${genres}`} {runtime && `• ${runtime}`}
                </p>
            </div>

            {/* ===== BOTTOM SECTION ===== */}
            <div className="flex items-center justify-between mt-4">

                <button
                    onClick={handleOpenMovie}
                    className="bg-[#FF0000] text-white text-xs px-2 py-2 rounded-lg font-semibold hover:bg-red-900 transition-all duration-200 hover:translate-x-1"
                >
                    Book Now
                </button>

                <p className="text-xs text-gray-400">
                    Coming Soon
                </p>
            </div>
        </div>
    );
};

export default Card;
