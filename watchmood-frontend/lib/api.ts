import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
});

export interface Recommendation {
  title: string;
  year: number;
  rating: number;
  reasoning: string;
  conflict_note: string | null;
}

export interface Review {
  id: number;
  tmdb_id: number;
  title: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface RecommendationList {
  recommendations: Recommendation[];
}

export const getRecommendation = async (
  mood: string
): Promise<RecommendationList> => {
  const res = await api.post("/recommend", { mood });
  return res.data;
};

export const getReviews = async (): Promise<Review[]> => {
  const res = await api.get("/reviews");
  return res.data;
};

export const addReview = async (
  tmdb_id: number,
  rating: number,
  review_text: string
) => {
  const res = await api.post("/reviews", { tmdb_id, rating, review_text });
  return res.data;
};

export const updateReview = async (
  review_id: number,
  rating: number,
  review_text: string
) => {
  const res = await api.put(`/reviews/${review_id}`, { rating, review_text });
  return res.data;
};

export const deleteReview = async (review_id: number) => {
  const res = await api.delete(`/reviews/${review_id}`);
  return res.data;
};

export const searchMovies = async (query: string): Promise<TMDBMovie[]> => {
  const res = await api.get("/movies/search", { params: { query } });
  return res.data;
};
