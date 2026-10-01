import { cn } from "@/lib/cn";

export type DividerVariant =
  | "line"
  | "diamond"
  | "dots"
  | "leaf"
  | "floral"
  | "heart"
  | "wave"
  | "star";

/** Hoạ tiết phân cách giữa các khối — nhiều biến thể, tint theo --tpl-primary. */
export default function Divider({
  variant = "diamond",
  className = "",
}: {
  variant?: DividerVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("flex justify-center py-2", className)}
      style={{ color: "var(--tpl-primary)" }}
    >
      <svg
        width="200"
        height="24"
        viewBox="0 0 200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {variant === "line" && (
          <line
            x1="20"
            y1="12"
            x2="180"
            y2="12"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
        )}

        {variant === "diamond" && (
          <>
            <line x1="14" y1="12" x2="82" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="118" y1="12" x2="186" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path
              d="M100 4c2 4 6 6 8 8-2 2-6 4-8 8-2-4-6-6-8-8 2-2 6-4 8-8Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </>
        )}

        {variant === "dots" && (
          <g fill="currentColor">
            <circle cx="70" cy="12" r="2" />
            <circle cx="90" cy="12" r="3" />
            <circle cx="110" cy="12" r="3" />
            <circle cx="130" cy="12" r="2" />
            <line x1="20" y1="12" x2="58" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="142" y1="12" x2="180" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </g>
        )}

        {variant === "leaf" && (
          <>
            <line x1="20" y1="12" x2="80" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="120" y1="12" x2="180" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <g fill="currentColor" opacity="0.85">
              <ellipse cx="92" cy="12" rx="9" ry="3.5" transform="rotate(-20 92 12)" />
              <ellipse cx="108" cy="12" rx="9" ry="3.5" transform="rotate(20 108 12)" />
              <circle cx="100" cy="12" r="2.2" />
            </g>
          </>
        )}

        {variant === "floral" && (
          <>
            <line x1="16" y1="12" x2="74" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.45" />
            <line x1="126" y1="12" x2="184" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.45" />
            <g fill="currentColor" opacity="0.9">
              <circle cx="100" cy="12" r="3" />
              <ellipse cx="88" cy="12" rx="6" ry="2.6" transform="rotate(-25 88 12)" />
              <ellipse cx="112" cy="12" rx="6" ry="2.6" transform="rotate(25 112 12)" />
              <ellipse cx="100" cy="4" rx="2.6" ry="6" />
              <ellipse cx="100" cy="20" rx="2.6" ry="6" />
            </g>
          </>
        )}

        {variant === "heart" && (
          <>
            <line x1="20" y1="12" x2="86" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="114" y1="12" x2="180" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path
              d="M100 17c-3-2.6-6-4.6-6-7.2 0-1.7 1.3-2.8 2.8-2.8 1.1 0 2.4.7 3.2 2 .8-1.3 2.1-2 3.2-2 1.5 0 2.8 1.1 2.8 2.8 0 2.6-3 4.6-6 7.2Z"
              fill="currentColor"
            />
          </>
        )}

        {variant === "wave" && (
          <path
            d="M20 12q10-7 20 0t20 0 20 0 20 0 20 0 20 0 20 0"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            opacity="0.7"
          />
        )}

        {variant === "star" && (
          <>
            <line x1="20" y1="12" x2="84" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="116" y1="12" x2="180" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path
              d="M100 5l1.8 4.7 5 .3-3.9 3.2 1.3 4.8-4.2-2.7-4.2 2.7 1.3-4.8-3.9-3.2 5-.3z"
              fill="currentColor"
            />
          </>
        )}
      </svg>
    </div>
  );
}
