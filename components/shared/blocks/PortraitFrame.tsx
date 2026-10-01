import { cn } from "@/lib/cn";

/** Khung ảnh chân dung bo góc, viền theo màu surface — dùng cho ảnh nhân vật chính. */
export default function PortraitFrame({
  src,
  alt = "",
  ratio = "3/4",
  className = "",
}: {
  src: string;
  alt?: string;
  /** Tỉ lệ ảnh, vd "3/4", "1/1", "16/10". */
  ratio?: string;
  className?: string;
}) {
  if (!src) return null;
  return (
    <div
      className={cn("overflow-hidden rounded-2xl border-4 shadow-md", className)}
      style={{ borderColor: "var(--tpl-surface)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- hỗ trợ ảnh blob cục bộ */}
      <img
        src={src}
        alt={alt}
        className="w-full object-cover"
        style={{ aspectRatio: ratio }}
      />
    </div>
  );
}
