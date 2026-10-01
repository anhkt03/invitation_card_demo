"use client";

import { useRef, useState, type CSSProperties } from "react";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import PhotoFrame, { type FrameVariant } from "@/components/shared/frames/PhotoFrame";
import { cn } from "@/lib/cn";

/** Props chung của mọi layout ảnh. */
export type LayoutProps = {
  images: string[];
  frame?: FrameVariant;
  /** Chú thích theo thứ tự ảnh (có thể thiếu/rỗng). */
  captions?: string[];
  /** Dải chữ trên ảnh (layout "banner"). */
  words?: string[];
};

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

/** Ô ảnh phủ kín ô cha, chú thích (nếu có) đè lên đáy ảnh. */
function Tile({
  src,
  caption,
  className,
  style,
}: {
  src: string;
  caption?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element -- ảnh có thể là URL ngoài do người tạo thiệp gửi */}
      <img
        src={src}
        alt=""
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {caption && (
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-2.5 pb-2 pt-8 text-center text-[11px] italic text-white">
          {caption}
        </p>
      )}
    </div>
  );
}

// ==================== TRIPTYCH — 3 ảnh một hàng, hai bên thấp hơn ====================
export function Triptych({ images, captions }: LayoutProps) {
  return (
    <div className="flex flex-col gap-3">
      {chunk(images, 3).map((row, r) => (
        <div
          key={r}
          className="grid items-center gap-2"
          style={{
            gridTemplateColumns: row.length === 3 ? "1fr 1.7fr 1fr" : `repeat(${row.length}, 1fr)`,
          }}
        >
          {row.map((src, i) => {
            const center = row.length === 3 && i === 1;
            const variant = center ? "zoomIn" : i === 0 ? "left" : "right";
            return (
              <RevealOnScroll key={`${src}-${i}`} variant={variant} delay={center ? 120 : 0}>
                <PhotoFrame
                  src={src}
                  variant="rounded"
                  ratio={center ? "3/4" : row.length === 3 ? "3/5" : "3/4"}
                  caption={captions?.[r * 3 + i]}
                />
              </RevealOnScroll>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ==================== BANNER — ảnh tràn lề, dải chữ phía trên ====================
export function Banner({ images, captions, words }: LayoutProps) {
  const rows = images.slice(0, 6);
  return (
    <div className="-mx-5 flex flex-col gap-1.5">
      {words && words.length > 0 && (
        <RevealOnScroll variant="fade">
          <div
            className="flex justify-between px-5 pb-1 text-[11px] uppercase tracking-[0.35em]"
            style={{ color: "var(--tpl-text)" }}
          >
            {words.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        </RevealOnScroll>
      )}
      {rows.map((src, i) => (
        <RevealOnScroll key={`${src}-${i}`} variant={i === 0 ? "zoomOut" : "up"}>
          <Tile src={src} caption={captions?.[i]} className="aspect-[4/3]" />
        </RevealOnScroll>
      ))}
    </div>
  );
}

// ==================== KODAK — cuộn phim đen, chú thích đè lên ảnh ====================
export function Kodak({ images, captions }: LayoutProps) {
  const list = images.slice(0, 6);
  const side: CSSProperties = { writingMode: "vertical-rl", transform: "rotate(180deg)" };
  return (
    <div
      className="-mx-2 rounded-sm px-1.5 py-5 text-white shadow-2xl"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, #1b1b1b, #0a0a0a 70%)",
      }}
    >
      <div className="flex flex-col gap-2">
        {list.map((src, i) => (
          <div key={`${src}-${i}`} className="grid grid-cols-[22px_1fr_22px] items-stretch gap-1.5">
            <span
              className="flex items-center justify-center text-[9px] font-semibold tracking-[0.3em] text-white/70"
              style={side}
            >
              KODAK 400 ▸ {String(i + 1).padStart(2, "0")}
            </span>
            <RevealOnScroll variant={i % 2 === 0 ? "left" : "right"}>
              <Tile
                src={src}
                caption={captions?.[i]}
                className="aspect-[4/3] border-[3px] border-white/90"
              />
            </RevealOnScroll>
            <span
              className="flex items-center justify-center text-[9px] tracking-[0.3em] text-white/60"
              style={side}
            >
              {String(i + 20)}A ◂ SAFETY FILM
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== MOSAIC A / B — 1 ảnh cao + 2 ảnh nhỏ ====================
function Mosaic({ images, captions, mirror }: LayoutProps & { mirror?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      {chunk(images, 3).map((group, g) =>
        group.length === 3 ? (
          <div key={g} className="grid aspect-[1/1.08] grid-cols-2 grid-rows-2 gap-2">
            {group.map((src, i) => (
              <RevealOnScroll
                key={`${src}-${i}`}
                variant={i === 0 ? "zoomIn" : mirror ? "left" : "right"}
                delay={i * 100}
                className={cn(
                  "h-full",
                  i === 0 && "row-span-2",
                  mirror && (i === 0 ? "col-start-2" : "col-start-1"),
                )}
              >
                <Tile src={src} caption={captions?.[g * 3 + i]} className="rounded-xl" />
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <div key={g} className="grid grid-cols-2 gap-2">
            {group.map((src, i) => (
              <RevealOnScroll key={`${src}-${i}`} variant="up">
                <Tile src={src} caption={captions?.[g * 3 + i]} className="aspect-square rounded-xl" />
              </RevealOnScroll>
            ))}
          </div>
        ),
      )}
    </div>
  );
}
export const MosaicA = (p: LayoutProps) => <Mosaic {...p} />;
export const MosaicB = (p: LayoutProps) => <Mosaic {...p} mirror />;

// ==================== BENTO — 6 ảnh xếp khít ô 3×4 ====================
const BENTO = [
  "col-span-2 row-span-2",
  "",
  "",
  "row-span-2",
  "col-span-2",
  "col-span-2",
];
export function Bento({ images, captions }: LayoutProps) {
  return (
    <div className="flex flex-col gap-2">
      {chunk(images, 6).map((group, g) =>
        group.length === 6 ? (
          <div key={g} className="grid aspect-[3/4] grid-cols-3 grid-rows-4 gap-2">
            {group.map((src, i) => (
              <RevealOnScroll
                key={`${src}-${i}`}
                variant={i % 2 === 0 ? "zoomIn" : "up"}
                delay={(i % 3) * 90}
                className={cn("h-full", BENTO[i])}
              >
                <Tile src={src} caption={captions?.[g * 6 + i]} className="rounded-lg" />
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <div key={g} className="grid grid-cols-3 gap-2">
            {group.map((src, i) => (
              <RevealOnScroll key={`${src}-${i}`} variant="zoomIn" delay={i * 80}>
                <Tile src={src} caption={captions?.[g * 6 + i]} className="aspect-square rounded-lg" />
              </RevealOnScroll>
            ))}
          </div>
        ),
      )}
    </div>
  );
}

// ==================== GRID 3 — lưới 3 cột vuông ====================
export function Grid3({ images, captions }: LayoutProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {images.map((src, i) => (
        <RevealOnScroll key={`${src}-${i}`} variant="zoomIn" delay={(i % 3) * 90}>
          <Tile src={src} caption={captions?.[i]} className="aspect-square rounded-md" />
        </RevealOnScroll>
      ))}
    </div>
  );
}

// ==================== STAIRS — bậc thang, lệch trái/phải ====================
export function Stairs({ images, frame, captions }: LayoutProps) {
  const ALIGN = ["self-start", "self-end", "self-center"];
  return (
    <div className="flex flex-col py-2">
      {images.map((src, i) => {
        const pos = i % 3;
        return (
          <RevealOnScroll
            key={`${src}-${i}`}
            variant={pos === 0 ? "left" : pos === 1 ? "right" : "zoomIn"}
            className={cn("w-[62%]", ALIGN[pos], i > 0 && "-mt-[3%]")}
          >
            <div style={{ position: "relative", zIndex: i + 1 }}>
              <PhotoFrame
                src={src}
                variant={frame ?? "double"}
                ratio={pos === 2 ? "1/1" : "4/5"}
                tilt={pos === 0 ? -2 : pos === 1 ? 2 : 0}
                caption={captions?.[i]}
              />
            </div>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}

// ==================== SCATTER — scrapbook rải ảnh ====================
const SPOTS = [
  { l: 2, t: 0, w: 50, r: -5 },
  { l: 47, t: 5, w: 49, r: 4 },
  { l: 4, t: 27, w: 46, r: 3 },
  { l: 43, t: 35, w: 53, r: -3 },
  { l: 21, t: 59, w: 48, r: 5 },
];
export function Scatter({ images, frame, captions }: LayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {chunk(images, SPOTS.length).map((group, g) => (
        <div key={g} className="relative aspect-[4/5.6] w-full">
          {group.map((src, i) => {
            const s = SPOTS[i];
            return (
              <RevealOnScroll
                key={`${src}-${i}`}
                variant="zoomIn"
                delay={i * 140}
                className="absolute"
                // z-index tăng dần để ảnh sau đè lên ảnh trước
                style={{ left: `${s.l}%`, top: `${s.t}%`, width: `${s.w}%`, zIndex: i + 1 }}
              >
                <PhotoFrame
                  src={src}
                  variant={frame ?? (i % 2 === 0 ? "polaroid" : "tape")}
                  ratio="1/1"
                  tilt={s.r}
                  caption={captions?.[g * SPOTS.length + i]}
                />
              </RevealOnScroll>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ==================== DECK — bộ bài, chạm để lật ảnh tiếp ====================
export function Deck({ images, captions }: LayoutProps) {
  const [order, setOrder] = useState(() => images.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);
  const busy = useRef(false);

  const next = () => {
    if (busy.current || images.length < 2) return;
    busy.current = true;
    setLeaving(true);
    setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(false);
      busy.current = false;
    }, 420);
  };

  return (
    <RevealOnScroll variant="zoomIn">
      <button
        type="button"
        onClick={next}
        aria-label="Xem ảnh tiếp theo"
        className="relative mx-auto block aspect-[4/5] w-[68%] cursor-pointer"
      >
        {order.slice(0, 4).map((imgIdx, p) => {
          const top = p === 0;
          const fly = top && leaving;
          return (
            <span
              key={imgIdx}
              className="absolute inset-0 block transition-all duration-500 ease-out"
              style={{
                zIndex: 10 - p,
                opacity: p > 2 && !fly ? 0 : 1,
                transform: fly
                  ? "translate(130%, 6%) rotate(22deg)"
                  : `translate(${p * 7}px, ${p * 9}px) rotate(${p === 0 ? -2 : p % 2 ? 4 : -5}deg) scale(${1 - p * 0.04})`,
              }}
            >
              <PhotoFrame
                src={images[imgIdx]}
                variant="polaroid"
                ratio="4/5"
                caption={captions?.[imgIdx]}
                className="h-full"
              />
            </span>
          );
        })}
      </button>
      {images.length > 1 && (
        <p className="mt-5 text-center text-xs tracking-wide" style={{ color: "var(--tpl-muted)" }}>
          Chạm vào ảnh để xem tiếp · {images.length} ảnh
        </p>
      )}
    </RevealOnScroll>
  );
}

// ==================== COVERFLOW — vuốt ngang, ảnh nghiêng 3D ====================
export function Coverflow({ images, frame, captions }: LayoutProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const sync = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <RevealOnScroll variant="fade">
      <div
        ref={trackRef}
        onScroll={sync}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto px-[22%] py-6"
        style={{ perspective: "900px" }}
      >
        {images.map((src, i) => {
          const d = i - active;
          return (
            <div
              key={`${src}-${i}`}
              className="w-full shrink-0 snap-center transition-transform duration-500"
              style={{
                transform: `translateX(${d * -14}%) rotateY(${Math.max(-1, Math.min(1, d)) * -42}deg) scale(${d === 0 ? 1 : 0.86})`,
                zIndex: 10 - Math.abs(d),
                opacity: Math.abs(d) > 2 ? 0.3 : 1,
              }}
            >
              <PhotoFrame src={src} variant={frame ?? "rounded"} ratio="3/4" caption={captions?.[i]} />
            </div>
          );
        })}
      </div>
    </RevealOnScroll>
  );
}

// ==================== DUO ROWS — hai dải ảnh chạy ngược chiều ====================
export function DuoRows({ images, frame }: LayoutProps) {
  const row = (list: string[], reverse: boolean) => {
    const loop = [...list, ...list];
    return (
      <div className="overflow-hidden motion-reduce:overflow-x-auto">
        <div
          className="marquee-track flex w-max gap-2"
          style={{
            ["--marquee-dur" as string]: `${Math.max(list.length * 5, 22)}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {loop.map((src, i) => (
            <div key={`${src}-${i}`} aria-hidden={i >= list.length} className="w-[104px] shrink-0">
              <PhotoFrame src={src} variant={frame ?? "rounded"} ratio="3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  };
  const reversed = [...images].reverse();
  return (
    <RevealOnScroll variant="fade" className="-mx-5 flex flex-col gap-2 py-2">
      {row(images, false)}
      {row(reversed, true)}
    </RevealOnScroll>
  );
}
