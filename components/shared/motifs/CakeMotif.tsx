/** Bánh kem sinh nhật có nến. */
export default function CakeMotif({
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
      {/* nến */}
      <rect x="47" y="20" width="6" height="16" rx="2" fill="var(--tpl-accent)" />
      <ellipse cx="50" cy="16" rx="3.5" ry="5" fill="#f5a623" />
      {/* tầng trên (kem) */}
      <path
        d="M28 46q22 10 44 0v10q-22 10-44 0z"
        fill="var(--tpl-surface)"
        stroke="var(--tpl-primary)"
        strokeWidth="2"
      />
      {/* thân bánh */}
      <rect x="26" y="56" width="48" height="24" rx="4" fill="var(--tpl-primary)" />
      <g fill="var(--tpl-surface)" opacity="0.85">
        <circle cx="38" cy="68" r="3" />
        <circle cx="50" cy="68" r="3" />
        <circle cx="62" cy="68" r="3" />
      </g>
      <rect x="22" y="80" width="56" height="5" rx="2.5" fill="var(--tpl-accent)" />
    </svg>
  );
}
