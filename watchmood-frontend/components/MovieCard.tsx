interface MovieCardProps {
  title: string;
  year: number | string;
  rating: number;
  overview?: string;
  onAddReview?: () => void;
}

export default function MovieCard({
  title,
  year,
  rating,
  overview,
  onAddReview,
}: MovieCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-zinc-400 text-sm">{year}</p>
        </div>
        <span className="text-yellow-400 text-sm font-medium shrink-0">
          ★ {rating.toFixed(1)}
        </span>
      </div>
      {overview && (
        <p className="text-zinc-400 text-sm line-clamp-3">{overview}</p>
      )}
      {onAddReview && (
        <button
          onClick={onAddReview}
          className="mt-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded px-3 py-1 transition-colors w-fit"
        >
          + Add Review
        </button>
      )}
    </div>
  );
}
