type Corner = "tl" | "tr" | "bl" | "br";

const ROTATE: Record<Corner, number> = { tl: 0, tr: 90, br: 180, bl: 270 };

/** Cụm hoa lá trang trí ở góc khung thiệp — đặt absolute vào 4 góc. */
export default function CornerFloral({
  corner = "tl",
  size = 120,
  className = "",
}: {
  corner?: Corner;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      className={className}
      style={{
        color: "var(--tpl-primary)",
        transform: `rotate(${ROTATE[corner]}deg)`,
      }}
    >
      <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M4 30C40 34 64 20 96 6" />
        <path d="M6 54C34 52 54 40 78 20" />
      </g>
      <g fill="currentColor" opacity="0.8">
        <ellipse cx="28" cy="24" rx="11" ry="4" transform="rotate(-22 28 24)" />
        <ellipse cx="52" cy="16" rx="10" ry="4" transform="rotate(-14 52 16)" />
        <ellipse cx="74" cy="12" rx="9" ry="3.5" transform="rotate(30 74 12)" />
        <ellipse cx="16" cy="46" rx="9" ry="3.5" transform="rotate(10 16 46)" />
        <ellipse cx="40" cy="40" rx="9" ry="3.5" transform="rotate(-24 40 40)" />
        <circle cx="18" cy="18" r="5" />
      </g>
    </svg>
  );
}
