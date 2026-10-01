"use client";

import { useEffect, useState } from "react";

type Props = {
  target: Date | null;
  /** Câu hiển thị khi đã qua ngày sự kiện. */
  passedLabel?: string;
};

type Parts = { d: number; h: number; m: number; s: number };

function remaining(target: Date): Parts | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor(diff / 3_600_000) % 24,
    m: Math.floor(diff / 60_000) % 60,
    s: Math.floor(diff / 1_000) % 60,
  };
}

/** Đồng hồ đếm ngược tới sự kiện. Chỉ tính sau khi mount để tránh lệch hydration. */
export default function Countdown({
  target,
  passedLabel = "Sự kiện đã diễn ra",
}: Props) {
  const valid = target && !Number.isNaN(target.getTime()) ? target : null;
  const [parts, setParts] = useState<Parts | null | "pending">("pending");

  useEffect(() => {
    if (!valid) return;
    const tick = () => setParts(remaining(valid));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- theo timestamp, không theo object Date
  }, [valid?.getTime()]);

  if (!valid) return null;

  if (parts === null) {
    return (
      <p
        className="text-center text-sm italic"
        style={{ color: "var(--tpl-muted)" }}
      >
        {passedLabel}
      </p>
    );
  }

  const cells: { value: string; label: string }[] =
    parts === "pending"
      ? [
          { value: "––", label: "Ngày" },
          { value: "––", label: "Giờ" },
          { value: "––", label: "Phút" },
          { value: "––", label: "Giây" },
        ]
      : [
          { value: String(parts.d), label: "Ngày" },
          { value: String(parts.h).padStart(2, "0"), label: "Giờ" },
          { value: String(parts.m).padStart(2, "0"), label: "Phút" },
          { value: String(parts.s).padStart(2, "0"), label: "Giây" },
        ];

  return (
    <div className="flex justify-center gap-3 px-6">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="flex w-[68px] flex-col items-center rounded-xl border py-3"
          style={{
            borderColor: "color-mix(in srgb, var(--tpl-primary) 30%, transparent)",
            backgroundColor: "var(--tpl-surface)",
          }}
        >
          <span
            className="tpl-heading text-2xl leading-none"
            style={{ color: "var(--tpl-primary)" }}
          >
            {cell.value}
          </span>
          <span
            className="mt-1.5 text-[length:calc(11px*var(--tpl-scale,1))] uppercase tracking-wider"
            style={{ color: "var(--tpl-muted)" }}
          >
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  );
}
