/** Hoạ tiết phân cách giữa các khối — ăn theo màu chủ đạo qua currentColor. */
export default function SectionDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex justify-center py-2 ${className}`}
      style={{ color: "var(--tpl-primary)" }}
    >
      <svg
        width="180"
        height="24"
        viewBox="0 0 180 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="4" y1="12" x2="62" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="118" y1="12" x2="176" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path
          d="M90 4c2 4 6 6 8 8-2 2-6 4-8 8-2-4-6-6-8-8 2-2 6-4 8-8Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="72" cy="12" r="1.6" fill="currentColor" />
        <circle cx="108" cy="12" r="1.6" fill="currentColor" />
      </svg>
    </div>
  );
}
