/**
 * Hiệu ứng cánh hoa/hạt rơi thuần CSS (keyframes khai báo trong globals.css).
 * Vị trí/độ trễ tính tất định theo index để render server và client
 * khớp nhau, tránh lỗi hydration.
 */
type Props = {
  count?: number;
  color?: string;
};

export default function FallingParticles({
  count = 12,
  color = "rgba(255, 255, 255, 0.65)",
}: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 83) % 100;
        const delay = ((i * 137) % 90) / 10;
        const duration = 9 + (i % 5) * 1.8;
        const size = 8 + ((i * 53) % 8);
        return (
          <span
            key={i}
            className="petal"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size * 1.2}px`,
              backgroundColor: color,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
