import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /**
   * "dark" = nền tối mờ cho chữ sáng (đặt trên ảnh bất kỳ);
   * "surface" = nền surface theo theme;
   * "outline" = chỉ viền, nền trong suốt.
   */
  variant?: "dark" | "surface" | "outline";
};

/** Khung nền cho khối chữ — giúp chữ đọc rõ trên ảnh nền, hoặc tạo thẻ nội dung. */
export default function Plaque({
  children,
  className = "",
  variant = "surface",
}: Props) {
  const style: CSSProperties =
    variant === "dark"
      ? { backgroundColor: "rgba(0,0,0,0.45)" }
      : variant === "outline"
        ? {
            border:
              "1px solid color-mix(in srgb, var(--tpl-primary) 30%, transparent)",
          }
        : {
            backgroundColor: "var(--tpl-surface)",
            border:
              "1px solid color-mix(in srgb, var(--tpl-primary) 20%, transparent)",
          };

  return (
    <div
      className={cn(
        "rounded-2xl px-6 py-8",
        variant === "dark" && "shadow-xl backdrop-blur-[2px]",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
