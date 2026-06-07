"use client";
import { useEffect, useState } from "react";
import { getReviews, deleteReview, updateReview, Review } from "@/lib/api";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [editRating, setEditRating] = useState<number>(7);
  const [editText, setEditText] = useState("");

  const fetchReviews = async () => {
    const data = await getReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteReview(id);
    fetchReviews();
  };

  const handleEditStart = (review: Review) => {
    setEditing(review.id);
    setEditRating(review.rating);
    setEditText(review.review_text);
  };

  const handleEditSave = async (id: number) => {
    await updateReview(id, editRating, editText);
    setEditing(null);
    fetchReviews();
  };

  if (loading)
    return <p className="text-zinc-400 text-sm">Loading reviews...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-white text-2xl font-semibold mb-1">Your Reviews</h1>
        <p className="text-zinc-400 text-sm">
          {reviews.length} movies reviewed
        </p>
      </div>

      {reviews.length === 0 && (
        <p className="text-zinc-500 text-sm">
          No reviews yet. Search for a movie to get started.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col gap-2"
          >
            {editing === review.id ? (
              <>
                <p className="text-white font-medium">{review.title}</p>
                <div className="flex items-center gap-3">
                  <label className="text-zinc-400 text-sm">Rating</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    step={0.5}
                    value={editRating}
                    onChange={(e) => setEditRating(parseFloat(e.target.value))}
                    className="bg-zinc-800 text-white rounded px-2 py-1 w-16 text-sm border border-zinc-700"
                  />
                  <span className="text-zinc-400 text-sm">/10</span>
                </div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                  className="bg-zinc-800 text-white rounded px-3 py-2 text-sm border border-zinc-700 resize-none focus:outline-none focus:border-zinc-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditSave(review.id)}
                    className="bg-white text-black text-sm font-medium px-4 py-1.5 rounded hover:bg-zinc-200 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="text-zinc-400 hover:text-white text-sm px-4 py-1.5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-medium">{review.title}</h3>
                    <p className="text-zinc-500 text-xs">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-yellow-400 text-sm font-medium">
                    ★ {review.rating}/10
                  </span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {review.review_text}
                </p>
                <div className="flex gap-3 mt-1">
                  <button
                    onClick={() => handleEditStart(review)}
                    className="text-zinc-400 hover:text-white text-xs transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-zinc-400 hover:text-red-400 text-xs transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
