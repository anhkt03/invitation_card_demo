import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Tiêu đề chữ viết tay (font script) — dùng cho tựa mềm mại như "Thư ngỏ". */
export default function ScriptHeading({
  children,
  className = "",
  as: Tag = "h2" as ElementType,
  tone = "primary",
}: {
  children: ReactNode;
  /** Override size/style tự do (vd className="text-5xl"). */
  className?: string;
  as?: ElementType;
  tone?: "primary" | "accent" | "text";
}) {
  return (
    <Tag
      className={cn("tpl-script text-3xl", className)}
      style={{ color: `var(--tpl-${tone})` }}
    >
      {children}
    </Tag>
  );
}
