/** Hoạ tiết trái tim đường nét — dùng cho cưới/kỷ niệm. */
export default function HeartMotif({
  size = 40,
  filled = false,
  className = "",
}: {
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      style={{ color: "var(--tpl-primary)" }}
    >
      <path
        d="M12 21s-7.5-4.9-10-9.2C.4 8.7 2 5.5 5.2 5.5c2 0 3.3 1.2 4.1 2.4C10.1 6.7 11.4 5.5 13.4 5.5c3.2 0 4.8 3.2 3.2 6.3C22 16.1 12 21 12 21Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
      />
    </svg>
  );
}
