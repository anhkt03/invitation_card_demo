import DateBlock from "@/components/shared/primitives/DateBlock";
import SectionHeading from "@/components/shared/primitives/SectionHeading";
import { cn } from "@/lib/cn";

type Props = {
  ceremonyName: string;
  date: Date | null;
  timeLabel?: string;
  note?: string;
  venueName: string;
  address: string;
  className?: string;
};

const weekdayFmt = new Intl.DateTimeFormat("vi-VN", { weekday: "long" });

/** Khối thông tin sự kiện: tên lễ + ngày (DateBlock) + giờ + địa điểm. */
export default function EventInfoBlock({
  ceremonyName,
  date,
  timeLabel,
  note,
  venueName,
  address,
  className = "",
}: Props) {
  const valid = date && !Number.isNaN(date.getTime()) ? date : null;

  return (
    <div className={cn("text-center", className)}>
      <SectionHeading>{ceremonyName}</SectionHeading>

      {valid && (
        <div className="mt-5">
          <DateBlock date={valid} weekday={weekdayFmt.format(valid)} />
        </div>
      )}

      {timeLabel && (
        <p
          className="mt-3 text-[length:calc(15px*var(--tpl-scale,1))]"
          style={{ color: "var(--tpl-text)" }}
        >
          {timeLabel}
        </p>
      )}

      {note && (
        <p className="mt-1 text-sm italic" style={{ color: "var(--tpl-muted)" }}>
          {note}
        </p>
      )}

      <div className="mt-5">
        <p
          className="text-[length:calc(15px*var(--tpl-scale,1))] font-semibold uppercase tracking-wide"
          style={{ color: "var(--tpl-text)" }}
        >
          {venueName}
        </p>
        <p className="mt-1 text-sm leading-6" style={{ color: "var(--tpl-muted)" }}>
          {address}
        </p>
      </div>
    </div>
  );
}
