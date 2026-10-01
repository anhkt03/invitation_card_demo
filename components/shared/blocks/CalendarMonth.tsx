import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

type Props = {
  /** Ngày sự kiện — tháng của ngày này được hiển thị, ngày này được đánh dấu. */
  date: Date | null;
  /** Đánh dấu ngày sự kiện bằng con dấu trái tim. */
  stamp?: boolean;
  /** Hiển thị năm lớn mờ phía sau lưới. */
  yearWatermark?: boolean;
  /** paper: thẻ giấy không có thanh tiêu đề (tiêu đề tháng do section ngoài hiển thị), Chủ nhật tô màu accent. */
  variant?: "light" | "dark" | "paper";
  /** Chỉ variant "paper": các ngày phụ đánh dấu bằng chấm nhỏ (vd ngày đính hôn). */
  dotDays?: number[];
  /** Chỉ variant "paper": chú thích dưới lịch. */
  legend?: ReactNode;
  className?: string;
};

/**
 * Lịch tháng (như cinelove): tiêu đề tháng·năm, lưới ngày bắt đầu từ Thứ 2,
 * con dấu trái tim trên ngày sự kiện, tùy chọn năm lớn mờ phía sau.
 */
export default function CalendarMonth({
  date,
  stamp = true,
  yearWatermark = true,
  variant = "light",
  dotDays = [],
  legend,
  className = "",
}: Props) {
  if (!date || Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = date.getMonth();
  const eventDay = date.getDate();
  const firstMon = (new Date(year, month, 1).getDay() + 6) % 7; // 0 = Thứ 2
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstMon }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];


  if (variant === "paper") {
    return (
      <div
        className={cn(
          "mx-auto flex w-full flex-col gap-2 rounded-md px-3.5 pb-[22px] pt-5",
          className,
        )}
        style={{ backgroundColor: "var(--tpl-surface)" }}
      >
        <div
          className="grid grid-cols-7 border-b pb-1.5 text-center text-[11px] font-semibold tracking-wide"
          style={{
            color: "var(--tpl-muted)",
            borderColor: "color-mix(in srgb, var(--tpl-muted) 28%, transparent)",
          }}
        >
          {WEEKDAYS.map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1.5">
          {cells.map((day, i) => {
            const isEvent = day === eventDay;
            const isSunday = i % 7 === 6;
            return (
              <div key={i} className="relative flex h-11 items-center justify-center">
                {day && isEvent && stamp && (
                  <svg
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%]"
                    width="46"
                    height="44"
                    viewBox="0 0 24 23"
                    aria-hidden
                  >
                    <path
                      d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.1c2.1-.2 4 .9 5.6 2.9 1.6-2 3.5-3.1 5.6-2.9 3.7.4 5.5 4.3 4 7.7C19.5 16.4 12 21 12 21z"
                      fill="color-mix(in srgb, var(--tpl-accent) 18%, white)"
                      stroke="var(--tpl-accent)"
                      strokeWidth="1.3"
                    />
                  </svg>
                )}
                {day && (
                  <span
                    className="tpl-heading relative"
                    style={{
                      fontSize: isEvent ? 19 : 17,
                      fontWeight: isEvent ? 700 : 500,
                      color:
                        isEvent || isSunday ? "var(--tpl-accent)" : "var(--tpl-text)",
                    }}
                  >
                    {day}
                  </span>
                )}
                {day && dotDays.includes(day) && (
                  <span
                    className="absolute bottom-1 left-1/2 -ml-[2.5px] size-[5px] rounded-full"
                    style={{ background: "var(--tpl-primary)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
        {legend && (
          <div
            className="mt-2.5 flex justify-center gap-5 text-xs"
            style={{ color: "var(--tpl-text)", opacity: 0.75 }}
          >
            {legend}
          </div>
        )}
      </div>
    );
  }

  const dark = variant === "dark";
  const headBg = dark ? "#18181b" : "var(--tpl-primary)";

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[360px] overflow-hidden rounded-xl border",
        className,
      )}
      style={{
        borderColor: dark
          ? "#18181b"
          : "color-mix(in srgb, var(--tpl-primary) 45%, transparent)",
        backgroundColor: "var(--tpl-surface)",
      }}
    >
      {/* Tiêu đề tháng · năm */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ backgroundColor: headBg, color: "#fff" }}
      >
        <span className="tpl-heading text-2xl leading-none">{month + 1}</span>
        <span className="text-lg tracking-wide">{year}</span>
      </div>

      <div className="relative px-4 py-4">
        {yearWatermark && (
          <span
            aria-hidden
            className="tpl-heading pointer-events-none absolute inset-0 flex items-center justify-center text-7xl font-bold"
            style={{ color: "color-mix(in srgb, var(--tpl-muted) 18%, transparent)" }}
          >
            {year}
          </span>
        )}

        <div className="relative grid grid-cols-7 gap-y-2 text-center">
          {WEEKDAYS.map((w) => (
            <span
              key={w}
              className="text-xs font-semibold uppercase"
              style={{ color: "var(--tpl-muted)" }}
            >
              {w}
            </span>
          ))}

          {cells.map((day, i) => {
            const isEvent = day === eventDay;
            return (
              <div
                key={i}
                className="relative flex h-8 items-center justify-center text-sm"
              >
                {day && isEvent && stamp && (
                  <svg
                    className="absolute"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    aria-hidden
                    style={{ color: "var(--tpl-primary)" }}
                  >
                    <path
                      d="M12 21s-7.5-4.9-10-9.2C.4 8.7 2 5.5 5.2 5.5c2 0 3.3 1.2 4.1 2.4C10.1 6.7 11.4 5.5 13.4 5.5c3.2 0 4.8 3.2 3.2 6.3C22 16.1 12 21 12 21Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {day && (
                  <span
                    className={isEvent && stamp ? "relative font-bold text-white" : ""}
                    style={
                      isEvent && stamp ? undefined : { color: "var(--tpl-text)" }
                    }
                  >
                    {day}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
