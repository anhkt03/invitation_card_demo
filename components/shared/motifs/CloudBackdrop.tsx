import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Nền trời + mây trắng bồng bềnh (như thiệp tốt nghiệp cinelove).
 * Bọc nội dung; màu trời chỉnh qua prop, mây là SVG trắng mềm.
 */
export default function CloudBackdrop({
  children,
  from = "#7fb2e6",
  to = "#bcd8f2",
  className = "",
}: {
  children?: ReactNode;
  from?: string;
  to?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(180deg, ${from}, ${to})` }}
    >
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full"
        viewBox="0 0 400 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g fill="#ffffff" opacity="0.85">
          <path d="M-20 120q30-26 66-14 10-30 48-24 20-24 52-6 34-6 40 24 34 2 30 34H-20z" />
          <path d="M240 60q26-22 58-10 18-18 44-4 28-2 30 26 24 4 18 30H236z" opacity="0.7" />
        </g>
        <g fill="#ffffff" opacity="0.6">
          <path d="M-20 560q40-30 84-14 16-28 54-16 26-18 54 8 26-2 26 34H-20z" />
          <path d="M300 620q30-20 60-6 22-10 30 18 22 6 12 30H300z" opacity="0.8" />
        </g>
        <g fill="#ffffff" opacity="0.4">
          <ellipse cx="120" cy="300" rx="46" ry="16" />
          <ellipse cx="320" cy="360" rx="40" ry="14" />
        </g>
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
