"use client";

/**
 * The player: a small white silhouette. A walking state animates the legs.
 * Kept deliberately simple — a sign, not a sprite. Reads as a graphic-novel
 * figure against the black world.
 */
export function Character({
  walking = false,
  className = "",
  size = 64,
}: {
  walking?: boolean;
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size * 1.6 }}
      aria-hidden
    >
      <div className={walking ? "animate-bob" : ""} style={{ height: "100%" }}>
        <svg
          viewBox="0 0 40 64"
          width={size}
          height={size * 1.6}
          fill="none"
          className="drop-shadow-[0_0_14px_rgba(255,255,255,0.25)]"
        >
          {/* head */}
          <circle cx="20" cy="9" r="7" fill="#fff" />
          {/* body */}
          <rect x="16" y="16" width="8" height="22" rx="4" fill="#fff" />
          {/* arms */}
          <rect x="11" y="19" width="4" height="16" rx="2" fill="#fff" />
          <rect x="25" y="19" width="4" height="16" rx="2" fill="#fff" />
          {/* legs */}
          <g style={{ transformOrigin: "20px 38px" }}>
            <rect
              x="16"
              y="38"
              width="4.5"
              height="22"
              rx="2.25"
              fill="#fff"
              className={walking ? "origin-top animate-walk" : ""}
              style={{ transformOrigin: "18px 38px" }}
            />
            <rect
              x="20"
              y="38"
              width="4.5"
              height="22"
              rx="2.25"
              fill="#fff"
              className={walking ? "origin-top animate-walk" : ""}
              style={{ transformOrigin: "22px 38px", animationDelay: "0.25s" }}
            />
          </g>
        </svg>
      </div>
      {/* soft contact shadow / light pool */}
      <div className="absolute -bottom-1 left-1/2 h-2 w-16 -translate-x-1/2 rounded-[100%] bg-white/20 blur-md" />
    </div>
  );
}
