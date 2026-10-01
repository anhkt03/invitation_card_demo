/** Nón sinh nhật + confetti. */
export default function PartyHatMotif({
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
    >
      <path d="M50 18L74 74H26z" fill="var(--tpl-primary)" />
      <g stroke="var(--tpl-surface)" strokeWidth="4" opacity="0.85">
        <path d="M38 44q12 8 24 0" fill="none" />
        <path d="M32 62q18 10 36 0" fill="none" />
      </g>
      <circle cx="50" cy="15" r="6" fill="var(--tpl-accent)" />
      <g fill="var(--tpl-accent)">
        <rect x="16" y="30" width="7" height="4" rx="2" transform="rotate(-24 16 30)" />
        <rect x="80" y="40" width="7" height="4" rx="2" transform="rotate(24 80 40)" />
        <circle cx="20" cy="60" r="3" />
        <circle cx="82" cy="66" r="3" />
      </g>
    </svg>
  );
}
