"use client";
import { useState } from "react";
import {
  getRecommendation,
  RecommendationList,
  Recommendation,
} from "../lib/api";

export default function Home() {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationList | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const rec = await getRecommendation(mood);
      setResult(rec);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-white text-2xl font-semibold mb-1">
          What are you in the mood for?
        </h1>
        <p className="text-zinc-400 text-sm">
          Describe a vibe, feeling, or anything really.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <textarea
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g. something cozy but not boring, a bit melancholic"
          rows={3}
          className="bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 resize-none"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white text-black font-medium text-sm px-5 py-2 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 w-fit"
        >
          {loading ? "Finding something..." : "Find something to watch"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {result && (
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-medium text-sm text-zinc-400">
            {result.recommendations.length} recommendations for you
          </h2>
          {result.recommendations.map((rec: Recommendation, i: number) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-white text-lg font-semibold">
                    {rec.title}
                  </h2>
                  <p className="text-zinc-400 text-sm">{rec.year}</p>
                </div>
                <span className="text-yellow-400 font-medium">
                  ★ {rec.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {rec.reasoning}
              </p>
              {rec.conflict_note && (
                <p className="text-zinc-500 text-xs border-t border-zinc-800 pt-3">
                  {rec.conflict_note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
