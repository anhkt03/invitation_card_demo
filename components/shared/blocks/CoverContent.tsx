import Kicker from "@/components/shared/primitives/Kicker";
import DatePill from "@/components/shared/primitives/DatePill";
import { cn } from "@/lib/cn";
import NamesDisplay from "./NamesDisplay";

type Props = {
  kicker?: string;
  left: string;
  right: string;
  subtitle?: string;
  dateLabel?: string;
  namesLayout?: "inline" | "stacked" | "monogram";
  /** "dark" khi đặt trên ảnh nền tối → chữ sáng; "theme" dùng màu theme. */
  tone?: "theme" | "dark";
  className?: string;
};

/**
 * Khối chữ màn bìa (kicker + tên + phụ đề + ngày) — tách khỏi ảnh/khung nền
 * để đặt lên bất kỳ CoverHero/ảnh nào. Ghép từ Kicker + NamesDisplay + DatePill.
 */
export default function CoverContent({
  kicker,
  left,
  right,
  subtitle,
  dateLabel,
  namesLayout = "inline",
  tone = "theme",
  className = "",
}: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      {kicker &&
        (dark ? (
          <p className="text-xs uppercase tracking-[0.3em] text-[#f7edd9]/90">
            {kicker}
          </p>
        ) : (
          <Kicker>{kicker}</Kicker>
        ))}

      {dark ? (
        <p className="tpl-heading text-4xl leading-tight text-[#f7edd9] drop-shadow-md sm:text-5xl">
          {left} & {right}
        </p>
      ) : (
        <NamesDisplay left={left} right={right} layout={namesLayout} />
      )}

      {subtitle && (
        <p
          className={`text-xs uppercase tracking-[0.3em] ${
            dark ? "text-[#f7edd9]/90" : ""
          }`}
          style={dark ? undefined : { color: "var(--tpl-muted)" }}
        >
          {subtitle}
        </p>
      )}

      {dateLabel &&
        (dark ? (
          <span className="mt-1 inline-block rounded-full border border-[#e8c98f]/70 px-5 py-1.5 text-sm tracking-widest text-[#f7edd9]">
            {dateLabel}
          </span>
        ) : (
          <DatePill className="mt-1">{dateLabel}</DatePill>
        ))}
    </div>
  );
}
