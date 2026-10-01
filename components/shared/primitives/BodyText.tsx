import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Đoạn văn nội dung — giữ xuống dòng, cỡ chữ theo --tpl-scale. */
export default function BodyText({
  children,
  className = "",
  tone = "text",
}: {
  children: ReactNode;
  /** Override size/style tự do. */
  className?: string;
  tone?: "text" | "muted";
}) {
  return (
    <p
      className={cn(
        "whitespace-pre-line text-[length:calc(15px*var(--tpl-scale,1))] leading-7",
        className,
      )}
      style={{ color: `var(--tpl-${tone})` }}
    >
      {children}
    </p>
  );
}
