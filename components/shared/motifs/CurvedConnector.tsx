/** Đường cong nét đứt nối giữa các khối — trang trí kiểu "sợi chỉ" dẫn hướng. */
export default function CurvedConnector({
  height = 120,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 300 120"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
      style={{ color: "var(--tpl-primary)" }}
    >
      <path
        d="M250 4C250 40 60 44 60 74s170 22 40 42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 6"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <circle cx="250" cy="4" r="3" fill="currentColor" />
    </svg>
  );
}
