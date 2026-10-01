/** Hoạ tiết nhẫn cưới đôi — tint theo --tpl-primary. */
export default function RingsMotif({
  size = 72,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={className}
      style={{ color: "var(--tpl-primary)" }}
    >
      <circle cx="42" cy="56" r="26" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="56" r="26" stroke="currentColor" strokeWidth="3" />
      <path d="M42 26l-6-10 6-6 6 6z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}
