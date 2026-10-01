import { cn } from "@/lib/cn";

/** Chữ lồng hai ký tự đầu — vd tên cô dâu chú rể trong khung tròn. */
export default function Monogram({
  left,
  right,
  size = 84,
  className = "",
}: {
  left: string;
  right: string;
  size?: number;
  className?: string;
}) {
  const l = (left || "?").trim().charAt(0).toUpperCase();
  const r = (right || "?").trim().charAt(0).toUpperCase();
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border-2",
        className,
      )}
      style={{
        width: size,
        height: size,
        borderColor: "var(--tpl-primary)",
        color: "var(--tpl-primary)",
      }}
    >
      <span className="tpl-heading text-2xl leading-none">{l}</span>
      <span className="tpl-script -mx-0.5 text-xl opacity-70">&</span>
      <span className="tpl-heading text-2xl leading-none">{r}</span>
    </div>
  );
}
