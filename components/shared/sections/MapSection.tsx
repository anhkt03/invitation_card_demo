type Props = {
  /** Để chuỗi rỗng nếu section ngoài đã có tiêu đề riêng. */
  heading?: string;
  venueName: string;
  address: string;
  /** Link Google Maps cụ thể; bỏ trống thì tự tạo link tìm kiếm từ tên và địa chỉ. */
  mapUrl?: string;
};

/**
 * Khối bản đồ chỉ đường. Ở trang nhập thử KHÔNG nhúng iframe Google Maps —
 * đưa địa chỉ người dùng gõ vào iframe là gửi dữ liệu nhập cho bên thứ ba,
 * vi phạm NFR-10. Chỉ hiển thị bản đồ cách điệu + link "Mở Google Maps"
 * (dữ liệu chỉ rời trang khi chính người dùng bấm). Trang thiệp published
 * sau này có thể nhúng iframe thật vì dữ liệu lấy từ DB.
 */
export default function MapSection({
  heading = "Bản đồ chỉ đường",
  venueName,
  address,
  mapUrl,
}: Props) {
  // Không có tên lẫn địa chỉ thì không có gì để chỉ đường.
  if (!venueName && !address) return null;
  const mapsUrl =
    mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${venueName} ${address}`,
    )}`;

  return (
    <section className="px-6">
      {heading && (
        <h2
          className="tpl-script mb-5 text-center text-3xl"
          style={{ color: "var(--tpl-primary)" }}
        >
          {heading}
        </h2>
      )}
      <div
        className="relative h-44 overflow-hidden rounded-2xl border"
        style={{
          borderColor: "color-mix(in srgb, var(--tpl-primary) 25%, transparent)",
          backgroundColor: "var(--tpl-surface)",
        }}
      >
        {/* Bản đồ cách điệu, tint theo màu template */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 176"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g
            style={{ stroke: "color-mix(in srgb, var(--tpl-muted) 40%, transparent)" }}
            strokeWidth="6"
            fill="none"
          >
            <path d="M-10 40 C 90 30, 150 80, 410 60" />
            <path d="M-10 130 C 120 150, 260 100, 410 140" />
            <path d="M120 -10 C 110 60, 160 120, 140 186" />
            <path d="M300 -10 C 290 70, 320 120, 310 186" />
          </g>
          <circle
            cx="200"
            cy="88"
            r="26"
            style={{ fill: "color-mix(in srgb, var(--tpl-primary) 15%, transparent)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="var(--tpl-primary)" aria-hidden>
            <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          <p
            className="max-w-[260px] text-center text-xs font-medium"
            style={{ color: "var(--tpl-text)" }}
          >
            {venueName}
          </p>
        </div>
      </div>
      <p
        className="mt-3 text-center text-sm leading-6"
        style={{ color: "var(--tpl-muted)" }}
      >
        {address}
      </p>
      <div className="mt-3 text-center">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-5 py-2 text-sm font-medium text-white transition hover:opacity-85"
          style={{ backgroundColor: "var(--tpl-primary)" }}
        >
          Mở Google Maps ↗
        </a>
      </div>
    </section>
  );
}
