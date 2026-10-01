import { cn } from "@/lib/cn";

type Wish = { name: string; message: string };

function parse(lines: string): Wish[] {
  return lines
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(":");
      return i > 0
        ? { name: l.slice(0, i).trim(), message: l.slice(i + 1).trim() }
        : { name: "", message: l };
    });
}

/**
 * Danh sách lời chúc kiểu bong bóng chat (như sổ lưu bút cinelove).
 * Nhận chuỗi nhiều dòng "Tên: lời chúc".
 */
export default function WishesBubbles({
  lines,
  className = "",
}: {
  lines: string;
  className?: string;
}) {
  const wishes = parse(lines);
  if (wishes.length === 0) return null;
  return (
    <div className={cn("space-y-2", className)}>
      {wishes.map((w, i) => (
        <div
          key={i}
          className="inline-block max-w-full rounded-2xl rounded-bl-sm px-4 py-2 text-[length:calc(13px*var(--tpl-scale,1))] leading-5"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--tpl-primary) 14%, var(--tpl-surface))",
            color: "var(--tpl-text)",
          }}
        >
          {w.name && (
            <span className="font-semibold" style={{ color: "var(--tpl-primary)" }}>
              {w.name}:{" "}
            </span>
          )}
          {w.message}
        </div>
      ))}
    </div>
  );
}
