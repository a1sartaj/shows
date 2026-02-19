import { useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import MovieCardSkeleton from "../../components/loaders/MovieCardSkeleton";
import Spinner from "../../components/loaders/Spinner";
import { fullDataToYear } from "../../lib/fullDataToYear";
import toast from "react-hot-toast";

const AdminAddMovie = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [addLoadingId, setAddLoadingId] = useState(null);

  const token = localStorage.getItem("token");

  /* ===============================
     SEARCH MOVIE (TMDB)
  ================================ */
  const handleSearchMovie = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setSearchLoading(true);

      const response = await axiosInstance.get(
        "/api/tmdb/admin/tmdb/search",
        {
          params: { query },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMovies(response.data.data || []);
    } catch (error) {
      console.error("Search movie error:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  /* ===============================
     ADD MOVIE (BY TMDB ID)
  ================================ */
  const handleAddMovie = async (tmdbId) => {
    try {
      setAddLoadingId(tmdbId);

      await axiosInstance.post(
        "/api/movie/admin/add-movie",
        { tmdbId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Movie added successfully");
    } catch (error) {
      console.error("Add movie error:", error);
      toast.error(error.response?.data?.message || "Failed to add movie");
    } finally {
      setAddLoadingId(null);
    }
  };

  return (
    <section className="w-full max-w-7xl px-2 xl:px-0 mx-auto">

      {/* SEARCH FORM */}
      <form
        onSubmit={handleSearchMovie}
        className="flex items-center gap-2 max-w-6xl mx-auto mb-8 bg-glass-bg rounded-lg p-2"
      >
        <input
          type="text"
          placeholder="Search new movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 bg-transparent outline-none placeholder:text-text-muted"
        />

        <button
          type="submit"
          disabled={searchLoading}
          className="px-6 py-2 bg-button-primary rounded-lg disabled:opacity-70"
        >
          {searchLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* SEARCH RESULTS */}
      {searchLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {[...Array(6)].map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col justify-between rounded-lg border overflow-hidden bg-glass-bg"
            >
              {/* POSTER */}
              <div className="w-full aspect-[2/3]">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="p-3 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">
                  {movie.title}
                  {movie.release_date && (
                    <span className="text-text-muted">
                      {" "}({fullDataToYear(movie.release_date)})
                    </span>
                  )}
                </h2>

                {/* ADD BUTTON */}
                <button
                  onClick={() => handleAddMovie(movie.id)}
                  disabled={addLoadingId === movie.id}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-button-primary rounded-lg disabled:opacity-70 hover:bg-button-primary-hover transition-all"
                >
                  {addLoadingId === movie.id ? (
                    <>
                      <Spinner />
                      Adding...
                    </>
                  ) : (
                    "Add Movie"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminAddMovie;
