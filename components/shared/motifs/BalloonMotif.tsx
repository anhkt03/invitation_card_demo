/** Cụm bóng bay — hợp thiệp sinh nhật. Dùng primary + accent cho tươi vui. */
export default function BalloonMotif({
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
    >
      <g>
        <ellipse cx="38" cy="34" rx="18" ry="22" fill="var(--tpl-primary)" />
        <path d="M38 56l-4 6h8z" fill="var(--tpl-primary)" />
        <path d="M38 62c3 12-3 20 0 30" stroke="var(--tpl-muted)" strokeWidth="1.5" fill="none" />
      </g>
      <g>
        <ellipse cx="64" cy="28" rx="16" ry="20" fill="var(--tpl-accent)" />
        <path d="M64 48l-3 5h6z" fill="var(--tpl-accent)" />
        <path d="M64 53c-3 12 3 20 0 30" stroke="var(--tpl-muted)" strokeWidth="1.5" fill="none" />
      </g>
      <ellipse cx="32" cy="26" rx="4" ry="6" fill="#fff" opacity="0.4" />
      <ellipse cx="58" cy="21" rx="3" ry="5" fill="#fff" opacity="0.4" />
    </svg>
  );
}
