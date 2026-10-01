"use client";

import { downloadIcs } from "@/lib/ics";

type Props = {
  /** Tên buổi lễ, vd "LỄ THÀNH HÔN". */
  ceremonyName: string;
  date: Date | null;
  /** Dòng phụ dưới ngày giờ — ngày âm lịch, dress code, ghi chú... (tùy chọn). */
  note?: string;
  venueName: string;
  address: string;
};

const weekdayFmt = new Intl.DateTimeFormat("vi-VN", { weekday: "long" });

function two(n: number) {
  return String(n).padStart(2, "0");
}

/** Khối thông tin sự kiện: thời gian, địa điểm + nút thêm vào lịch (.ics cục bộ). */
export default function EventDetails({
  ceremonyName,
  date,
  note,
  venueName,
  address,
}: Props) {
  const valid = date && !Number.isNaN(date.getTime()) ? date : null;

  return (
    <section className="px-6 text-center">
      <h2
        className="tpl-heading text-2xl tracking-[0.18em]"
        style={{ color: "var(--tpl-text)" }}
      >
        {ceremonyName}
      </h2>

      {valid && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <span
            className="text-sm uppercase tracking-[0.2em]"
            style={{ color: "var(--tpl-muted)" }}
          >
            {weekdayFmt.format(valid)}
          </span>
          <span
            className="tpl-heading border-x px-4 text-4xl leading-none"
            style={{
              color: "var(--tpl-primary)",
              borderColor: "color-mix(in srgb, var(--tpl-primary) 40%, transparent)",
            }}
          >
            {two(valid.getDate())}
          </span>
          <span
            className="text-sm uppercase tracking-[0.2em]"
            style={{ color: "var(--tpl-muted)" }}
          >
            {two(valid.getMonth() + 1)} · {valid.getFullYear()}
          </span>
        </div>
      )}

      {valid && (
        <p className="mt-3 text-[length:calc(15px*var(--tpl-scale,1))]" style={{ color: "var(--tpl-text)" }}>
          Vào lúc{" "}
          <span className="font-semibold" style={{ color: "var(--tpl-primary)" }}>
            {two(valid.getHours())}:{two(valid.getMinutes())}
          </span>
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

      {valid && (
        <button
          type="button"
          onClick={() =>
            downloadIcs({
              title: `${ceremonyName} — ${venueName}`,
              start: valid,
              location: address,
            })
          }
          className="mt-5 rounded-full border px-5 py-2 text-sm font-medium transition hover:opacity-80"
          style={{
            borderColor: "var(--tpl-primary)",
            color: "var(--tpl-primary)",
          }}
        >
          + Thêm vào lịch
        </button>
      )}
    </section>
  );
}
