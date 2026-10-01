"use client";

import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import PhotoFrame, {
  frameRadius,
  type FrameVariant,
} from "@/components/shared/frames/PhotoFrame";
import { cn } from "@/lib/cn";
import {
  Banner,
  Bento,
  Coverflow,
  Deck,
  DuoRows,
  Grid3,
  Kodak,
  MosaicA,
  MosaicB,
  Scatter,
  Stairs,
  Triptych,
} from "./GalleryMore";

/**
 * Các bố cục album ảnh:
 * - grid       lưới 2 cột, ảnh trượt vào từ hai bên
 * - masonry    2 cột so le, ảnh cao thấp khác nhau
 * - collage    ảnh dán xếp lệch, nghiêng nhẹ
 * - carousel   vuốt ngang, ảnh giữa nổi bật
 * - filmstrip  dải ảnh tự chạy ngang
 * - slideshow  một khung, ảnh tự chuyển mờ chéo
 * - feature    một ảnh lớn + lưới ảnh nhỏ
 * - triptych   3 ảnh một hàng, hai ảnh bên thấp hơn
 * - banner     ảnh tràn lề xếp dọc, dải chữ phía trên (kiểu Cinelove)
 * - kodak      cuộn phim đen, nhãn dọc hai bên, chú thích đè lên ảnh
 * - mosaicA/B  1 ảnh cao + 2 ảnh nhỏ (đảo bên)
 * - bento      6 ảnh xếp khít ô 3×4
 * - grid3      lưới 3 cột vuông
 * - stairs     bậc thang lệch trái/phải
 * - scatter    scrapbook rải ảnh chồng nhau
 * - deck       bộ bài, chạm để lật ảnh tiếp
 * - coverflow  vuốt ngang, ảnh nghiêng 3D
 * - duoRows    hai dải ảnh chạy ngược chiều
 */
export type GalleryLayout =
  | "grid"
  | "masonry"
  | "collage"
  | "carousel"
  | "filmstrip"
  | "slideshow"
  | "feature"
  | "triptych"
  | "banner"
  | "kodak"
  | "mosaicA"
  | "mosaicB"
  | "bento"
  | "grid3"
  | "stairs"
  | "scatter"
  | "deck"
  | "coverflow"
  | "duoRows";

type Props = {
  /** Danh sách URL/đường dẫn ảnh; rỗng thì không hiển thị gì. */
  images: string[];
  layout?: GalleryLayout;
  /** Kiểu khung cho từng ảnh (collage/filmstrip có mặc định riêng nếu không truyền). */
  frame?: FrameVariant;
  /** Chú thích theo thứ tự ảnh (tuỳ chọn). */
  captions?: string[];
  /** Dải chữ trên ảnh — chỉ layout "banner". */
  words?: string[];
  className?: string;
};

const MASONRY_RATIOS = ["3/4", "1/1", "4/5", "2/3", "1/1", "3/4"];
const COLLAGE_TILTS = [-3, 2.5, 2, -2.5, -1.5, 3];

// ==================== GRID ====================
function Grid({ images, frame, captions }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((src, i) => (
        <RevealOnScroll
          key={`${src}-${i}`}
          variant={i % 2 === 0 ? "left" : "right"}
          delay={(Math.floor(i / 2) % 2) * 90}
        >
          <PhotoFrame
            src={src}
            variant={frame ?? "rounded"}
            ratio="3/4"
            caption={captions?.[i]}
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}

// ==================== MASONRY ====================
function Masonry({ images, frame, captions }: Props) {
  return (
    <div className="columns-2 gap-3">
      {images.map((src, i) => (
        <RevealOnScroll
          key={`${src}-${i}`}
          variant={i % 3 === 0 ? "zoomIn" : "up"}
          delay={(i % 2) * 120}
          className="mb-3 break-inside-avoid"
        >
          <PhotoFrame
            src={src}
            variant={frame ?? "rounded"}
            ratio={MASONRY_RATIOS[i % MASONRY_RATIOS.length]}
            caption={captions?.[i]}
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}

// ==================== COLLAGE ====================
function Collage({ images, frame, captions }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 px-1">
      {images.map((src, i) => (
        <RevealOnScroll
          key={`${src}-${i}`}
          variant="zoomIn"
          delay={(i % 2) * 140}
          className={i % 2 === 1 ? "mt-9" : ""}
        >
          <PhotoFrame
            src={src}
            variant={frame ?? (i % 2 === 0 ? "polaroid" : "tape")}
            ratio={frame === "polaroid" || !frame ? "4/5" : undefined}
            tilt={COLLAGE_TILTS[i % COLLAGE_TILTS.length]}
            caption={captions?.[i]}
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}

// ==================== CAROUSEL ====================
function Carousel({ images, frame, captions }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

  const goTo = (i: number) => {
    const track = trackRef.current;
    const el = track?.children[i] as HTMLElement | undefined;
    if (!track || !el) return;
    track.scrollTo({
      left: el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <RevealOnScroll variant="fade">
      <div
        ref={trackRef}
        onScroll={syncActive}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-[14%] py-3"
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="w-full shrink-0 snap-center transition-all duration-500"
            style={{
              transform: i === active ? "scale(1)" : "scale(0.9)",
              opacity: i === active ? 1 : 0.6,
            }}
          >
            <PhotoFrame
              src={src}
              variant={frame ?? "rounded"}
              ratio="4/5"
              caption={captions?.[i]}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ảnh ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === active ? 22 : 6,
                background:
                  i === active
                    ? "var(--tpl-primary)"
                    : "color-mix(in srgb, var(--tpl-primary) 30%, transparent)",
              }}
            />
          ))}
        </div>
      )}
    </RevealOnScroll>
  );
}

// ==================== FILMSTRIP ====================
function Filmstrip({ images, frame }: Props) {
  // Nhân đôi danh sách để dịch -50% là vòng lặp liền mạch; bản sao ẩn với trình đọc màn hình.
  const loop = [...images, ...images];
  return (
    <RevealOnScroll variant="fade">
      <div className="overflow-hidden py-2 motion-reduce:overflow-x-auto">
        <div
          className="marquee-track flex w-max gap-3"
          style={{ ["--marquee-dur" as string]: `${Math.max(images.length * 6, 24)}s` }}
        >
          {loop.map((src, i) => (
            <div
              key={`${src}-${i}`}
              aria-hidden={i >= images.length}
              className="w-[150px] shrink-0"
            >
              <PhotoFrame src={src} variant={frame ?? "film"} ratio="4/5" caption={`${(i % images.length) + 1}`.padStart(2, "0")} />
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

// ==================== SLIDESHOW ====================
function Slideshow({ images, frame, captions }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const variant = frame ?? "rounded";
  const ratio = variant === "circle" ? "1/1" : "4/5";

  useEffect(() => {
    if (images.length < 2 || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % images.length), 3800);
    return () => clearInterval(id);
  }, [images.length, paused]);

  return (
    <RevealOnScroll variant="zoomIn">
      <div
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        className="mx-auto w-[82%]"
      >
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: ratio,
            borderRadius: frameRadius(variant, ratio),
            border: "5px solid var(--tpl-surface)",
            boxShadow: "0 10px 26px rgba(0,0,0,.16)",
          }}
        >
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- ảnh có thể là URL ngoài do người tạo thiệp gửi
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))}
        </div>
        {captions?.[active] && (
          <p className="mt-2 text-center text-xs" style={{ color: "var(--tpl-muted)" }}>
            {captions[active]}
          </p>
        )}
        {images.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ảnh ${i + 1}`}
                onClick={() => setActive(i)}
                className="size-1.5 rounded-full transition-all"
                style={{
                  background:
                    i === active
                      ? "var(--tpl-primary)"
                      : "color-mix(in srgb, var(--tpl-primary) 30%, transparent)",
                  transform: i === active ? "scale(1.5)" : "none",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </RevealOnScroll>
  );
}

// ==================== FEATURE ====================
function Feature({ images, frame, captions }: Props) {
  const [first, ...rest] = images;
  return (
    <div className="flex flex-col gap-3">
      <RevealOnScroll variant="zoomOut">
        <PhotoFrame src={first} variant={frame ?? "rounded"} ratio="4/5" caption={captions?.[0]} />
      </RevealOnScroll>
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {rest.map((src, i) => (
            <RevealOnScroll
              key={`${src}-${i}`}
              variant={i % 2 === 0 ? "left" : "right"}
            >
              <PhotoFrame
                src={src}
                variant={frame ?? "rounded"}
                ratio="1/1"
                caption={captions?.[i + 1]}
              />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}

/** Album ảnh với nhiều bố cục; lọc ảnh rỗng, không có ảnh nào thì không render. */
export default function Gallery({ layout = "grid", images, className, ...rest }: Props) {
  const list = images.filter(Boolean);
  if (list.length === 0) return null;

  const props = { images: list, ...rest };
  return (
    <div className={cn("w-full", className)}>
      {layout === "masonry" && <Masonry {...props} />}
      {layout === "collage" && <Collage {...props} />}
      {layout === "carousel" && <Carousel {...props} />}
      {layout === "filmstrip" && <Filmstrip {...props} />}
      {layout === "slideshow" && <Slideshow {...props} />}
      {layout === "feature" && <Feature {...props} />}
      {layout === "grid" && <Grid {...props} />}
      {layout === "triptych" && <Triptych {...props} />}
      {layout === "banner" && <Banner {...props} />}
      {layout === "kodak" && <Kodak {...props} />}
      {layout === "mosaicA" && <MosaicA {...props} />}
      {layout === "mosaicB" && <MosaicB {...props} />}
      {layout === "bento" && <Bento {...props} />}
      {layout === "grid3" && <Grid3 {...props} />}
      {layout === "stairs" && <Stairs {...props} />}
      {layout === "scatter" && <Scatter {...props} />}
      {layout === "deck" && <Deck {...props} />}
      {layout === "coverflow" && <Coverflow {...props} />}
      {layout === "duoRows" && <DuoRows {...props} />}
    </div>
  );
}
