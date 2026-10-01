/** Cụm ngôi sao lấp lánh — dùng chung, hợp sinh nhật / mừng. */
export default function StarMotif({
  size = 56,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const star = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const ang = (Math.PI / 5) * i - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.42;
      return `${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`;
    }).join(" ");
    return <polygon points={pts} fill="currentColor" />;
  };
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
      {star(50, 44, 24)}
      <g opacity="0.8">{star(78, 24, 10)}</g>
      <g opacity="0.7">{star(22, 66, 8)}</g>
    </svg>
  );
}
