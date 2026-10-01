import { useId, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Các kiểu khung ảnh. Màu viền/nền lấy từ biến --tpl-* nên tự ăn theo palette.
 * - rounded   bo góc mềm
 * - arch      vòm (mái cong phía trên) — hợp ảnh chân dung
 * - oval      elip đứng
 * - circle    tròn
 * - heart     trái tim
 * - polaroid  ảnh dán, có chỗ cho chú thích chữ viết tay
 * - tape      ảnh dán bằng hai miếng băng dính
 * - double    viền kép lệch (đường viền thứ hai nằm sau ảnh)
 * - ornate    viền mảnh cổ điển, điểm kim cương ở 4 góc
 * - film      cuộn phim có lỗ xỏ
 */
export type FrameVariant =
  | "rounded"
  | "arch"
  | "oval"
  | "circle"
  | "heart"
  | "polaroid"
  | "tape"
  | "double"
  | "ornate"
  | "film";

export const FRAME_VARIANTS: FrameVariant[] = [
  "rounded",
  "arch",
  "oval",
  "circle",
  "heart",
  "polaroid",
  "tape",
  "double",
  "ornate",
  "film",
];

const DEFAULT_RATIO: Record<FrameVariant, string> = {
  rounded: "4/5",
  arch: "3/4",
  oval: "3/4",
  circle: "1/1",
  heart: "1/1",
  polaroid: "1/1",
  tape: "4/5",
  double: "4/5",
  ornate: "3/4",
  film: "4/5",
};

const SHADOW = "0 10px 26px rgba(0,0,0,.16)";
const SURFACE = "var(--tpl-surface)";

type Props = {
  /** Đường dẫn hoặc URL ảnh. Để trống thì khung không hiển thị gì. */
  src: string;
  alt?: string;
  variant?: FrameVariant;
  /** Tỉ lệ ảnh, vd "3/4" — mặc định theo từng kiểu khung. */
  ratio?: string;
  /** object-position CSS của ảnh, vd "center 30%". */
  focus?: string;
  /** Chú thích (polaroid hiện chữ viết tay dưới ảnh; kiểu khác hiện dòng nhỏ bên dưới). */
  caption?: string;
  /** Nghiêng khung (độ), nên dùng với polaroid/tape/film. */
  tilt?: number;
  /** Chiều rộng khung do className quyết định (mặc định 100% khung chứa). */
  className?: string;
};

function Img({
  src,
  alt,
  focus,
  className,
}: {
  src: string;
  alt: string;
  focus?: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- ảnh có thể là URL ngoài do người tạo thiệp gửi
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      className={cn("block h-full w-full object-cover", className)}
      style={{ objectPosition: focus ?? "center" }}
    />
  );
}

/** Bán kính mái vòm: nửa bề rộng, quy ra % chiều cao theo tỉ lệ ảnh. */
function archRadius(ratio: string): string {
  const [w, h] = ratio.split("/").map(Number);
  const v = w && h ? (50 * w) / h : 37.5;
  return `50% 50% 10px 10px / ${v}% ${v}% 10px 10px`;
}

export default function PhotoFrame({
  src,
  alt = "",
  variant = "rounded",
  ratio,
  focus,
  caption,
  tilt = 0,
  className = "",
}: Props) {
  const clipId = useId();
  if (!src) return null;

  const r = ratio ?? DEFAULT_RATIO[variant];
  const rot: CSSProperties | undefined = tilt
    ? { transform: `rotate(${tilt}deg)` }
    : undefined;
  const wrap = (children: ReactNode) => (
    <figure className={cn("m-0", className)} style={rot}>
      {children}
    </figure>
  );
  const note = caption ? (
    <figcaption
      className="mt-2 text-center text-xs"
      style={{ color: "var(--tpl-muted)" }}
    >
      {caption}
    </figcaption>
  ) : null;

  switch (variant) {
    case "arch":
      return wrap(
        <>
          <div
            className="overflow-hidden"
            style={{
              aspectRatio: r,
              borderRadius: archRadius(r),
              border: `5px solid ${SURFACE}`,
              boxShadow: SHADOW,
            }}
          >
            <Img src={src} alt={alt} focus={focus} />
          </div>
          {note}
        </>,
      );

    case "oval":
    case "circle":
      return wrap(
        <>
          <div
            className="overflow-hidden"
            style={{
              aspectRatio: r,
              borderRadius: "50%",
              border: `5px solid ${SURFACE}`,
              boxShadow: SHADOW,
            }}
          >
            <Img src={src} alt={alt} focus={focus} />
          </div>
          {note}
        </>,
      );

    case "heart":
      return wrap(
        <>
          <svg width="0" height="0" aria-hidden className="absolute">
            <defs>
              <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                <path d="M0.5 0.96C0.5 0.96 0.03 0.64 0.03 0.31C0.03 0.15 0.15 0.04 0.29 0.04C0.38 0.04 0.46 0.09 0.5 0.17C0.54 0.09 0.62 0.04 0.71 0.04C0.85 0.04 0.97 0.15 0.97 0.31C0.97 0.64 0.5 0.96 0.5 0.96Z" />
              </clipPath>
            </defs>
          </svg>
          <div style={{ filter: "drop-shadow(0 10px 14px rgba(0,0,0,.2))" }}>
            <div style={{ aspectRatio: r, clipPath: `url(#${clipId})` }}>
              <Img src={src} alt={alt} focus={focus} />
            </div>
          </div>
          {note}
        </>,
      );

    case "polaroid":
      return wrap(
        <div
          className="bg-white px-2.5 pb-3 pt-2.5"
          style={{ boxShadow: SHADOW }}
        >
          <div style={{ aspectRatio: r }} className="overflow-hidden">
            <Img src={src} alt={alt} focus={focus} />
          </div>
          <figcaption
            className="tpl-script flex min-h-9 items-center justify-center truncate px-1 pt-2 text-center text-lg leading-tight"
            style={{ color: "var(--tpl-primary)" }}
          >
            {caption}
          </figcaption>
        </div>,
      );

    case "tape":
      return wrap(
        <div className="relative">
          <span
            aria-hidden
            className="absolute -top-2.5 left-3 z-10 h-5 w-16 -rotate-[8deg]"
            style={{
              background:
                "color-mix(in srgb, var(--tpl-accent) 32%, rgba(255,255,255,.85))",
              boxShadow: "0 1px 2px rgba(0,0,0,.12)",
              opacity: 0.85,
            }}
          />
          <span
            aria-hidden
            className="absolute -top-2.5 right-3 z-10 h-5 w-16 rotate-[8deg]"
            style={{
              background:
                "color-mix(in srgb, var(--tpl-accent) 32%, rgba(255,255,255,.85))",
              boxShadow: "0 1px 2px rgba(0,0,0,.12)",
              opacity: 0.85,
            }}
          />
          <div className="bg-white p-2" style={{ boxShadow: SHADOW }}>
            <div style={{ aspectRatio: r }} className="overflow-hidden">
              <Img src={src} alt={alt} focus={focus} />
            </div>
          </div>
          {note}
        </div>,
      );

    case "double":
      return wrap(
        <>
          <div className="relative pb-3 pr-3">
            <span
              aria-hidden
              className="absolute bottom-0 right-0 top-3"
              style={{
                border:
                  "1.5px solid color-mix(in srgb, var(--tpl-primary) 70%, transparent)",
                left: 12,
              }}
            />
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: r,
                border: `5px solid ${SURFACE}`,
                boxShadow: SHADOW,
              }}
            >
              <Img src={src} alt={alt} focus={focus} />
            </div>
          </div>
          {note}
        </>,
      );

    case "ornate": {
      const gem = (pos: CSSProperties) => (
        <span
          aria-hidden
          className="absolute size-2 rotate-45"
          style={{ background: "var(--tpl-primary)", ...pos }}
        />
      );
      return wrap(
        <>
          <div
            className="relative p-2"
            style={{
              border: "1px solid var(--tpl-primary)",
              background: SURFACE,
              boxShadow: SHADOW,
            }}
          >
            {gem({ left: -4.5, top: -4.5 })}
            {gem({ right: -4.5, top: -4.5 })}
            {gem({ left: -4.5, bottom: -4.5 })}
            {gem({ right: -4.5, bottom: -4.5 })}
            <div
              className="p-1"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--tpl-primary) 45%, transparent)",
              }}
            >
              <div style={{ aspectRatio: r }} className="overflow-hidden">
                <Img src={src} alt={alt} focus={focus} />
              </div>
            </div>
          </div>
          {note}
        </>,
      );
    }

    case "film": {
      const holes: CSSProperties = {
        backgroundImage:
          "repeating-linear-gradient(90deg, #f3eee4 0 9px, transparent 9px 19px)",
        height: 8,
      };
      return wrap(
        <div
          className="px-2.5 py-3.5"
          style={{ background: "#1c1b1a", boxShadow: SHADOW }}
        >
          <div aria-hidden className="mb-2 rounded-[1px]" style={holes} />
          <div style={{ aspectRatio: r }} className="overflow-hidden">
            <Img src={src} alt={alt} focus={focus} />
          </div>
          <div aria-hidden className="mt-2 rounded-[1px]" style={holes} />
          {caption && (
            <p className="mt-1.5 truncate text-center text-[10px] tracking-widest text-white/70">
              {caption}
            </p>
          )}
        </div>,
      );
    }

    case "rounded":
    default:
      return wrap(
        <>
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              aspectRatio: r,
              border: `4px solid ${SURFACE}`,
              boxShadow: SHADOW,
            }}
          >
            <Img src={src} alt={alt} focus={focus} />
          </div>
          {note}
        </>,
      );
  }
}

/**
 * Bo góc của các kiểu khung "một khối" (rounded/arch/oval/circle) — để component
 * khác (vd slideshow, nơi nhiều ảnh xếp chồng trong một khung) tái dùng cùng hình dạng.
 */
export function frameRadius(variant: FrameVariant, ratio?: string): string {
  const r = ratio ?? DEFAULT_RATIO[variant];
  if (variant === "arch") return archRadius(r);
  if (variant === "oval" || variant === "circle") return "50%";
  return "16px";
}
