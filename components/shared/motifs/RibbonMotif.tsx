/** Nơ ruy băng — dùng cho khai trương (cắt băng) / trang trí quà. */
export default function RibbonMotif({
  size = 64,
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
      <path d="M50 50C22 30 8 40 16 56c6 12 26 6 34-6Z" fill="currentColor" />
      <path d="M50 50C78 30 92 40 84 56c-6 12-26 6-34-6Z" fill="currentColor" />
      <path d="M50 50l-14 40h10l6-26 6 26h10l-14-40z" fill="var(--tpl-accent)" />
      <circle cx="50" cy="50" r="9" fill="var(--tpl-accent)" />
    </svg>
  );
}
