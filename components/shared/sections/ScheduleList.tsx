export type ScheduleItem = {
  /** Giờ hiển thị, vd "09:00". */
  time: string;
  title: string;
  /** Các dòng mô tả bên dưới (ngày, địa điểm...). Dòng rỗng bị bỏ qua. */
  lines: string[];
};

/** Danh sách chương trình theo giờ: cột giờ lớn bên trái, tiêu đề + chi tiết bên phải. */
export default function ScheduleList({ items }: { items: ScheduleItem[] }) {
  return (
    <div
      className="flex flex-col rounded-md px-[18px] py-1"
      style={{ background: "var(--tpl-surface)" }}
    >
      {items.map((item, i) => (
        <div
          key={`${item.time}-${item.title}`}
          className="flex gap-4 py-5"
          style={
            i < items.length - 1
              ? { borderBottom: "1px solid color-mix(in srgb, var(--tpl-muted) 28%, transparent)" }
              : undefined
          }
        >
          <div
            className="tpl-heading w-[76px] shrink-0 text-[30px] leading-none [font-variant-numeric:lining-nums]"
            style={{ color: "var(--tpl-primary)" }}
          >
            {item.time}
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <div className="text-[15px] font-semibold" style={{ color: "var(--tpl-text)" }}>
              {item.title}
            </div>
            {item.lines.filter(Boolean).map((line) => (
              <div
                key={line}
                className="text-[13px]"
                style={{ color: "var(--tpl-text)", opacity: 0.72 }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
