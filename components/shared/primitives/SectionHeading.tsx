import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Tiêu đề section chữ serif, giãn chữ nhẹ — trang trọng (vd "LỄ THÀNH HÔN"). */
export default function SectionHeading({
  children,
  className = "",
  tone = "text",
}: {
  children: ReactNode;
  /** Override size/style tự do. */
  className?: string;
  tone?: "text" | "primary" | "accent";
}) {
  return (
    <h2
      className={cn("tpl-heading text-2xl tracking-[0.15em]", className)}
      style={{ color: `var(--tpl-${tone})` }}
    >
      {children}
    </h2>
  );
}
