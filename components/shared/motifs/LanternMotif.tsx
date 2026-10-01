/** Đèn lồng — hợp thiệp khai trương / lễ truyền thống. */
export default function LanternMotif({
  size = 56,
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
      <line x1="50" y1="6" x2="50" y2="18" stroke="var(--tpl-accent)" strokeWidth="2" />
      <rect x="38" y="18" width="24" height="8" rx="3" fill="var(--tpl-accent)" />
      <ellipse cx="50" cy="52" rx="26" ry="30" fill="var(--tpl-primary)" />
      <path d="M24 52a26 30 0 0 0 52 0" fill="#000" opacity="0.12" />
      <g stroke="var(--tpl-accent)" strokeWidth="1.5" opacity="0.8">
        <path d="M50 22v60" />
        <path d="M32 40q18 -10 36 0" fill="none" />
        <path d="M32 64q18 10 36 0" fill="none" />
      </g>
      <rect x="38" y="78" width="24" height="7" rx="3" fill="var(--tpl-accent)" />
      <g stroke="var(--tpl-accent)" strokeWidth="2" strokeLinecap="round">
        <line x1="42" y1="85" x2="42" y2="94" />
        <line x1="50" y1="85" x2="50" y2="96" />
        <line x1="58" y1="85" x2="58" y2="94" />
      </g>
    </svg>
  );
}
