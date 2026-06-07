"use client";
import { useState } from "react";
import { addReview } from "../lib/api";

interface ReviewFormProps {
  tmdbId: number;
  title: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ReviewForm({
  tmdbId,
  title,
  onSuccess,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState<number>(7);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reviewText.trim()) return;
    setLoading(true);
    try {
      await addReview(tmdbId, rating, reviewText);
      onSuccess();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 flex flex-col gap-3">
      <p className="text-white font-medium">{title}</p>
      <div className="flex items-center gap-3">
        <label className="text-zinc-400 text-sm">Rating</label>
        <input
          type="number"
          min={1}
          max={10}
          step={0.5}
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          className="bg-zinc-800 text-white rounded px-2 py-1 w-16 text-sm border border-zinc-700"
        />
        <span className="text-zinc-400 text-sm">/10</span>
      </div>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="What did you think?"
        rows={3}
        className="bg-zinc-800 text-white rounded px-3 py-2 text-sm border border-zinc-700 resize-none placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white text-black text-sm font-medium px-4 py-1.5 rounded hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="text-zinc-400 hover:text-white text-sm px-4 py-1.5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
