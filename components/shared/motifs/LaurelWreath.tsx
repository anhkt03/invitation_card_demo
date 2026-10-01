/** Vòng nguyệt quế — hợp thiệp tốt nghiệp / vinh danh. */
export default function LaurelWreath({
  size = 96,
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
      <g stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.9">
        <path d="M35 88C18 74 18 44 34 28" />
        <path d="M65 88C82 74 82 44 66 28" />
      </g>
      <g fill="currentColor" opacity="0.85">
        {[
          [30, 78, -64],
          [24, 62, -80],
          [26, 46, -100],
          [34, 34, -120],
          [70, 78, 64],
          [76, 62, 80],
          [74, 46, 100],
          [66, 34, 120],
        ].map(([cx, cy, rot], i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="7"
            ry="2.6"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        ))}
      </g>
    </svg>
  );
}
