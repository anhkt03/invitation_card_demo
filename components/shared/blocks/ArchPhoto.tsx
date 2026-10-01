import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  /** Độ dày viền (px) — màu viền theo --tpl-bg. */
  border?: number;
  /** object-position CSS, vd "center 40%". */
  focus?: string;
  className?: string;
};

/** Khung ảnh vòm (mái cong phía trên) — dùng cho ảnh chân dung cô dâu chú rể. */
export default function ArchPhoto({
  src,
  alt = "",
  width = 290,
  height = 400,
  border = 6,
  focus = "center 40%",
  className = "",
}: Props) {
  if (!src) return null;
  return (
    <div
      className={cn("box-border shrink-0 overflow-hidden", className)}
      style={{
        width,
        height,
        borderRadius: `${width / 2}px ${width / 2}px 6px 6px`,
        border: `${border}px solid var(--tpl-bg)`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- hỗ trợ ảnh blob cục bộ */}
      <img
        src={src}
        alt={alt}
        className="block h-full w-full object-cover"
        style={{ objectPosition: focus }}
      />
    </div>
  );
}
