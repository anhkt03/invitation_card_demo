import { cn } from "@/lib/cn";

type Props = {
  date: Date;
  /** Nhãn thứ trong tuần (vd "Chủ Nhật"); ẩn nếu không truyền. */
  weekday?: string;
  className?: string;
};

function two(n: number) {
  return String(n).padStart(2, "0");
}

/** Khối ngày kiểu lịch: thứ · NGÀY lớn · tháng·năm — điểm nhấn phần sự kiện. */
export default function DateBlock({ date, weekday, className = "" }: Props) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {weekday && (
        <span
          className="text-sm uppercase tracking-[0.2em]"
          style={{ color: "var(--tpl-muted)" }}
        >
          {weekday}
        </span>
      )}
      <span
        className="tpl-heading border-x px-4 text-4xl leading-none"
        style={{
          color: "var(--tpl-primary)",
          borderColor: "color-mix(in srgb, var(--tpl-primary) 40%, transparent)",
        }}
      >
        {two(date.getDate())}
      </span>
      <span
        className="text-sm uppercase tracking-[0.2em]"
        style={{ color: "var(--tpl-muted)" }}
      >
        {two(date.getMonth() + 1)} · {date.getFullYear()}
      </span>
    </div>
  );
}
