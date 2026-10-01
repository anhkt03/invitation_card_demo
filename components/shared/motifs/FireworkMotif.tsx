/** Pháo hoa — hợp thiệp khai trương / mừng. */
export default function FireworkMotif({
  size = 64,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const rays = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={className}
      style={{ color: "var(--tpl-accent)" }}
    >
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        {rays.map((deg) => (
          <line
            key={deg}
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            transform={`rotate(${deg} 50 50)`}
            opacity="0.9"
          />
        ))}
      </g>
      {rays.map((deg) => (
        <circle
          key={deg}
          cx="50"
          cy="20"
          r="2.4"
          fill="var(--tpl-primary)"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="4" fill="var(--tpl-primary)" />
    </svg>
  );
}
