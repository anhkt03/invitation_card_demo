import { cn } from "@/lib/cn";

/** Khối thơ/lời đề từ in nghiêng, mỗi dòng một câu — nhẹ nhàng, thi vị. */
export default function PoemLines({
  lines,
  className = "",
  align = "center",
}: {
  /** Chuỗi nhiều dòng (tách bằng \n) hoặc mảng dòng. */
  lines: string | string[];
  className?: string;
  align?: "center" | "left" | "right";
}) {
  const arr = Array.isArray(lines)
    ? lines
    : lines.split(/\r?\n/).map((l) => l.trim());
  return (
    <div
      className={cn(
        "space-y-1 italic leading-7",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
      style={{ color: "var(--tpl-muted)" }}
    >
      {arr.filter(Boolean).map((line, i) => (
        <p key={i} className="text-[length:calc(14px*var(--tpl-scale,1))]">
          {line}
        </p>
      ))}
    </div>
  );
}
