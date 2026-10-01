import { cn } from "@/lib/cn";

/** Chấm chỉ mục carousel — tô đậm chấm đang hoạt động. */
export default function CarouselDots({
  count,
  active = 0,
  className = "",
}: {
  count: number;
  active?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full transition"
          style={{
            backgroundColor:
              i === active
                ? "var(--tpl-primary)"
                : "color-mix(in srgb, var(--tpl-muted) 45%, transparent)",
          }}
        />
      ))}
    </div>
  );
}
