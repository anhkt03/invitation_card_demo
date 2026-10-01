import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Dòng chữ nhỏ in hoa, giãn chữ — đặt trên tiêu đề (vd "Save the date"). */
export default function Kicker({
  children,
  className = "",
  tone = "muted",
}: {
  children: ReactNode;
  /** Override size/style tự do — class truyền vào luôn thắng mặc định. */
  className?: string;
  tone?: "muted" | "primary" | "accent" | "text";
}) {
  return (
    <p
      className={cn("text-xs uppercase tracking-[0.3em]", className)}
      style={{ color: `var(--tpl-${tone})` }}
    >
      {children}
    </p>
  );
}
