import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Khung viền trang trí bao quanh nội dung — nhiều biến thể đường viền.
 * Dùng bọc một khối (tên, lời mời) cho cảm giác thiệp cổ điển.
 */
export default function FrameBorder({
  children,
  variant = "double",
  className = "",
}: {
  children: ReactNode;
  variant?: "double" | "corners" | "rounded";
  className?: string;
}) {
  const primary = "var(--tpl-primary)";

  if (variant === "corners") {
    return (
      <div className={cn("relative p-5", className)}>
        {(["tl", "tr", "bl", "br"] as const).map((c) => (
          <span
            key={c}
            className={`absolute h-5 w-5 ${
              c === "tl"
                ? "left-0 top-0 border-l-2 border-t-2"
                : c === "tr"
                  ? "right-0 top-0 border-r-2 border-t-2"
                  : c === "bl"
                    ? "bottom-0 left-0 border-b-2 border-l-2"
                    : "bottom-0 right-0 border-b-2 border-r-2"
            }`}
            style={{ borderColor: primary }}
          />
        ))}
        {children}
      </div>
    );
  }

  if (variant === "double") {
    return (
      <div
        className={cn("rounded-sm p-[5px]", className)}
        style={{
          border: `1px solid color-mix(in srgb, ${primary} 45%, transparent)`,
        }}
      >
        <div
          className="rounded-sm px-5 py-6"
          style={{
            border: `1px solid color-mix(in srgb, ${primary} 25%, transparent)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  // rounded
  return (
    <div
      className={cn("rounded-2xl px-5 py-6", className)}
      style={{
        border: `1.5px solid color-mix(in srgb, ${primary} 35%, transparent)`,
      }}
    >
      {children}
    </div>
  );
}
