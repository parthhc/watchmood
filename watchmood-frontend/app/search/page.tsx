"use client";
import { useState } from "react";
import { searchMovies, TMDBMovie } from "../../lib/api";
import MovieCard from "../../components/MovieCard";
import ReviewForm from "../../components/ReviewForm";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeReview, setActiveReview] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const movies = await searchMovies(query);
      setResults(movies);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-white text-2xl font-semibold mb-1">
          Search Movies
        </h1>
        <p className="text-zinc-400 text-sm">
          Find a movie and add your review.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for a movie..."
          className="flex-1 bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {results.map((movie) => (
          <div key={movie.id}>
            {activeReview === movie.id ? (
              <ReviewForm
                tmdbId={movie.id}
                title={movie.title}
                onSuccess={() => setActiveReview(null)}
                onCancel={() => setActiveReview(null)}
              />
            ) : (
              <MovieCard
                title={movie.title}
                year={movie.release_date?.slice(0, 4)}
                rating={movie.vote_average}
                overview={movie.overview}
                onAddReview={() => setActiveReview(movie.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
