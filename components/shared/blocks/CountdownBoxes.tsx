"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

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

/**
 * Đếm ngược dạng 4 ô rời (như cinelove). variant "light" ô sáng theo theme,
 * "dark" ô nền tối chữ trắng. Chỉ tính sau mount để tránh lệch hydration.
 */
export default function CountdownBoxes({
  target,
  variant = "light",
  className = "",
}: {
  target: Date | null;
  variant?: "light" | "dark";
  className?: string;
}) {
  const valid = target && !Number.isNaN(target.getTime()) ? target : null;
  const [parts, setParts] = useState<Parts | null | "pending">("pending");

  useEffect(() => {
    if (!valid) return;
    const tick = () => setParts(remaining(valid));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid?.getTime()]);

  if (!valid) return null;

  const cells: { value: string; label: string }[] = [
    { value: parts === "pending" || !parts ? "0" : String(parts.d), label: "ngày" },
    { value: parts === "pending" || !parts ? "0" : String(parts.h), label: "giờ" },
    { value: parts === "pending" || !parts ? "0" : String(parts.m), label: "phút" },
    { value: parts === "pending" || !parts ? "0" : String(parts.s), label: "giây" },
  ];

  const dark = variant === "dark";

  return (
    <div className={cn("flex justify-center gap-2.5", className)}>
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="flex w-[64px] flex-col items-center rounded-xl py-3 shadow-sm"
          style={
            dark
              ? { backgroundColor: "#18181b", color: "#fff" }
              : {
                  backgroundColor: "var(--tpl-surface)",
                  color: "var(--tpl-primary)",
                }
          }
        >
          <span className="tpl-heading text-2xl leading-none">{cell.value}</span>
          <span
            className="mt-1 text-[11px] uppercase tracking-wider"
            style={dark ? { color: "#d4d4d8" } : { color: "var(--tpl-muted)" }}
          >
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  );
}
