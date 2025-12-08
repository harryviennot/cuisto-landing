"use client";

interface Props {
  rating: number | null;
  ratingCount: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export default function RecipeRating({
  rating,
  ratingCount,
  size = "md",
  showCount = true,
}: Props) {
  if (!rating || ratingCount === 0) return null;

  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Generate 5 stars with fill based on rating
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starNumber = i + 1;
    const fill =
      rating >= starNumber
        ? "full"
        : rating >= starNumber - 0.5
        ? "half"
        : "empty";
    return { key: i, fill };
  });

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <div key={star.key} className="relative">
            {/* Empty star (background) */}
            <svg
              className={`${sizeClasses[size]} text-brown-200`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {/* Filled star (overlay) */}
            {star.fill !== "empty" && (
              <svg
                className={`${sizeClasses[size]} text-amber-400 absolute inset-0`}
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{
                  clipPath:
                    star.fill === "half"
                      ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                      : undefined,
                }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {showCount && (
        <span className={`${textClasses[size]} text-text-muted`}>
          ({ratingCount})
        </span>
      )}
    </div>
  );
}
