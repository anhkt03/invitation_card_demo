import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Dòng chữ ký in nghiêng — vd tên cặp đôi/gia đình cuối thiệp. */
export default function Signature({
  children,
  className = "",
}: {
  children: ReactNode;
  /** Override size/style tự do. */
  className?: string;
}) {
  return (
    <p
      className={cn("tpl-heading text-xl italic", className)}
      style={{ color: "var(--tpl-accent)" }}
    >
      {children}
    </p>
  );
}
