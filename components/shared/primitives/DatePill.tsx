import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Viên hiển thị ngày, bo tròn có viền — dùng ở màn bìa. */
export default function DatePill({
  children,
  className = "",
}: {
  children: ReactNode;
  /** Override size/style tự do. */
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-5 py-1.5 text-sm tracking-widest",
        className,
      )}
      style={{
        borderColor: "color-mix(in srgb, var(--tpl-primary) 45%, transparent)",
        color: "var(--tpl-primary)",
      }}
    >
      {children}
    </span>
  );
}
