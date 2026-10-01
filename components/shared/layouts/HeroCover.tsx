"use client";

import { ChevronDown } from "lucide-react";
import FallingParticles from "@/components/shared/effects/FallingParticles";
import KenBurns from "@/components/shared/effects/KenBurns";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import PhotoFrame from "@/components/shared/frames/PhotoFrame";
import { cn } from "@/lib/cn";

/**
 * Các kiểu bìa:
 * - overlay   ảnh tràn khung, tên đè lên đáy ảnh (chữ trắng)
 * - fade      ảnh tràn khung mờ dần xuống nền trang, tên nằm trên nền (như Cinelove)
 * - arch      ảnh khung vòm ở giữa, tên bên dưới
 * - inset     ảnh khung viền cổ điển, tên trên tấm thẻ gối lên đáy ảnh
 * - stack     hai ảnh dán chéo nhau, tên nằm giữa
 * - triptych  ảnh cắt thành 3 dải đứng (hoặc 3 ảnh), so le khi xuất hiện
 * - circle    ảnh tròn có vòng nét đứt xoay chậm
 */
export type HeroVariant =
  | "overlay"
  | "fade"
  | "arch"
  | "inset"
  | "stack"
  | "triptych"
  | "circle";

export const HERO_VARIANTS: HeroVariant[] = [
  "overlay",
  "fade",
  "arch",
  "inset",
  "stack",
  "triptych",
  "circle",
];

type Props = {
  variant?: HeroVariant;
  /** Ảnh bìa chính. */
  photo: string;
  /** Ảnh phụ (lấy từ album) cho kiểu stack / triptych; thiếu thì dùng lại ảnh chính. */
  extras?: string[];
  groom: string;
  bride: string;
  /** Dòng chữ viết tay nhỏ, vd "Save the date". */
  kicker?: string;
  /** Ngày hiển thị, vd "20 · 12 · 2026". */
  date?: string;
  quote?: string;
  /** Cánh hoa rơi trên ảnh (overlay/triptych). */
  particles?: boolean;
  className?: string;
};

/** Khối tên đôi viết tay; size theo bề rộng cột (cqw) nên đúng cỡ ở mọi màn hình. */
function Names({
  groom,
  bride,
  size = "15cqw",
  onPhoto = false,
  align = "center",
}: {
  groom: string;
  bride: string;
  size?: string;
  onPhoto?: boolean;
  align?: "center" | "start";
}) {
  if (!groom && !bride) return null;
  return (
    <h1
      className={cn(
        "tpl-script flex flex-col leading-[1.02]",
        align === "center" ? "items-center" : "items-start",
        onPhoto && "drop-shadow-lg",
      )}
      style={{ fontSize: size, color: onPhoto ? "#fff" : "var(--tpl-primary)" }}
    >
      <span>{groom}</span>
      {groom && bride && (
        <span
          className="tpl-heading italic leading-none opacity-90"
          style={{ fontSize: "0.46em", color: onPhoto ? "#fff" : "var(--tpl-accent)" }}
        >
          &amp;
        </span>
      )}
      <span>{bride}</span>
    </h1>
  );
}

/** Dòng phụ: kicker + ngày + câu trích, xuất hiện nối tiếp. */
function Meta({
  date,
  quote,
  onPhoto,
  start = 0,
  align = "center",
}: {
  date?: string;
  quote?: string;
  onPhoto?: boolean;
  start?: number;
  align?: "center" | "start";
}) {
  const color = onPhoto ? "#fff" : "var(--tpl-text)";
  return (
    <>
      {date && (
        <RevealOnScroll variant="up" delay={start}>
          <p
            className="rounded-full border px-5 py-1.5 text-sm tracking-[0.3em]"
            style={{
              color: onPhoto ? "#fff" : "var(--tpl-primary)",
              borderColor: onPhoto ? "rgba(255,255,255,.7)" : "var(--tpl-primary)",
            }}
          >
            {date}
          </p>
        </RevealOnScroll>
      )}
      {quote && (
        <RevealOnScroll variant="fade" delay={start + 300}>
          <p
            className={cn(
              "tpl-heading max-w-[300px] text-base italic opacity-90",
              align === "start" ? "text-left" : "text-center",
            )}
            style={{ color }}
          >
            “{quote}”
          </p>
        </RevealOnScroll>
      )}
    </>
  );
}

function Kicker({ children, onPhoto }: { children?: string; onPhoto?: boolean }) {
  if (!children) return null;
  return (
    <RevealOnScroll variant="fade" duration={1300}>
      <p
        className="tpl-script text-3xl drop-shadow"
        style={{ color: onPhoto ? "#fff" : "var(--tpl-accent)" }}
      >
        {children}
      </p>
    </RevealOnScroll>
  );
}

export default function HeroCover({
  variant = "overlay",
  photo,
  extras = [],
  groom,
  bride,
  kicker,
  date,
  quote,
  particles = false,
  className = "",
}: Props) {
  // ---------- overlay ----------
  if (variant === "overlay") {
    return (
      <header
        className={cn(
          "relative isolate flex aspect-[3/4.4] w-full flex-col justify-end overflow-hidden text-white",
          className,
        )}
        style={{ background: "var(--tpl-dark)" }}
      >
        <KenBurns src={photo} focus="50% 30%" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/5 to-black/70" />
        {particles && <FallingParticles count={10} />}
        <div className="flex flex-col items-center gap-3 px-6 pb-16 text-center">
          <Kicker onPhoto>{kicker}</Kicker>
          <RevealOnScroll variant="blur" duration={1600} delay={250}>
            <Names groom={groom} bride={bride} onPhoto />
          </RevealOnScroll>
          <Meta date={date} quote={quote} onPhoto start={700} />
        </div>
        <ChevronDown
          aria-hidden
          className="absolute bottom-4 left-1/2 size-6 -translate-x-1/2 animate-bounce opacity-80"
        />
      </header>
    );
  }

  // ---------- fade ----------
  if (variant === "fade") {
    const mask = "linear-gradient(to bottom, #000 58%, transparent 100%)";
    return (
      <header className={cn("relative w-full overflow-hidden", className)}>
        <div
          className="relative aspect-[3/4]"
          style={{ WebkitMaskImage: mask, maskImage: mask }}
        >
          <KenBurns src={photo} focus="50% 25%" className="absolute inset-0" />
        </div>
        <div className="relative z-10 -mt-[24%] flex flex-col items-center gap-3 px-6 pb-14 text-center">
          <Kicker>{kicker}</Kicker>
          <RevealOnScroll variant="blur" duration={1500} delay={200}>
            <Names groom={groom} bride={bride} />
          </RevealOnScroll>
          <Meta date={date} quote={quote} start={600} />
        </div>
      </header>
    );
  }

  // ---------- arch ----------
  if (variant === "arch") {
    return (
      <header className={cn("flex flex-col items-center gap-5 px-6 pb-14 pt-12 text-center", className)}>
        <Kicker>{kicker}</Kicker>
        <RevealOnScroll variant="zoomIn" duration={1200} className="w-[76%]">
          <PhotoFrame src={photo} variant="arch" ratio="3/4" focus="50% 30%" />
        </RevealOnScroll>
        <RevealOnScroll variant="up" delay={300}>
          <Names groom={groom} bride={bride} size="13cqw" />
        </RevealOnScroll>
        <Meta date={date} quote={quote} start={600} />
      </header>
    );
  }

  // ---------- inset ----------
  if (variant === "inset") {
    return (
      <header
        className={cn("px-5 pb-12 pt-8 text-center", className)}
        style={{ background: "color-mix(in srgb, var(--tpl-bg) 90%, var(--tpl-muted))" }}
      >
        <RevealOnScroll variant="zoomOut" duration={1200}>
          <PhotoFrame src={photo} variant="ornate" ratio="4/5" focus="50% 30%" />
        </RevealOnScroll>
        <RevealOnScroll
          variant="up"
          delay={400}
          className="relative z-10 mx-auto -mt-[16%] flex w-[86%] flex-col items-center gap-3 rounded-md px-4 py-6 shadow-xl"
          style={{ background: "var(--tpl-surface)" }}
        >
          {kicker && (
            <p className="tpl-script text-2xl" style={{ color: "var(--tpl-accent)" }}>
              {kicker}
            </p>
          )}
          <Names groom={groom} bride={bride} size="12cqw" />
          {date && (
            <p className="tpl-heading text-lg tracking-[0.25em]" style={{ color: "var(--tpl-primary)" }}>
              {date}
            </p>
          )}
          {quote && <p className="tpl-heading text-sm italic opacity-80">“{quote}”</p>}
        </RevealOnScroll>
      </header>
    );
  }

  // ---------- stack ----------
  if (variant === "stack") {
    const second = extras[0] || photo;
    return (
      <header className={cn("px-5 pb-12 pt-10", className)}>
        <div className="relative aspect-[4/5.6] w-full">
          <RevealOnScroll
            variant="left"
            duration={1200}
            className="absolute left-0 top-0 z-[1] w-[64%]"
          >
            <PhotoFrame src={photo} variant="polaroid" ratio="3/4" tilt={-3} focus="50% 30%" />
          </RevealOnScroll>
          <RevealOnScroll
            variant="right"
            duration={1200}
            delay={200}
            className="absolute bottom-0 right-0 z-[2] w-[56%]"
          >
            <PhotoFrame
              src={second}
              variant="tape"
              ratio="4/5"
              tilt={4}
              focus={second === photo ? "70% 40%" : "50% 40%"}
            />
          </RevealOnScroll>
          <RevealOnScroll
            variant="up"
            delay={700}
            className="absolute bottom-[1%] left-0 z-[3] w-[44%]"
          >
            <Names groom={groom} bride={bride} size="10cqw" align="start" />
          </RevealOnScroll>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <Kicker>{kicker}</Kicker>
          <Meta date={date} quote={quote} start={900} />
        </div>
      </header>
    );
  }

  // ---------- triptych ----------
  if (variant === "triptych") {
    const separate = extras.length >= 2;
    const srcs = separate ? [photo, extras[0], extras[1]] : [photo, photo, photo];
    // Một ảnh duy nhất: mỗi dải là một phần của cùng bức ảnh (ảnh rộng 300% dịch sang trái).
    return (
      <header
        className={cn("relative isolate w-full overflow-hidden text-white", className)}
        style={{ background: "var(--tpl-dark)" }}
      >
        <div className="grid aspect-[3/4.3] grid-cols-3 gap-[3px]">
          {srcs.map((src, i) => (
            <RevealOnScroll
              key={i}
              variant={i === 1 ? "down" : "up"}
              duration={1300}
              delay={i * 150}
              className="relative h-full overflow-hidden"
            >
              {src && (
                // eslint-disable-next-line @next/next/no-img-element -- ảnh có thể là URL ngoài do người tạo thiệp gửi
                <img
                  src={src}
                  alt=""
                  className="absolute top-0 h-full max-w-none object-cover"
                  style={
                    separate
                      ? { left: 0, width: "100%" }
                      : { left: `${-100 * i}%`, width: "300%", objectPosition: "50% 25%" }
                  }
                />
              )}
            </RevealOnScroll>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />
        {particles && <FallingParticles count={8} />}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-12 text-center">
          <Kicker onPhoto>{kicker}</Kicker>
          <RevealOnScroll variant="blur" duration={1500} delay={500}>
            <Names groom={groom} bride={bride} size="14cqw" onPhoto />
          </RevealOnScroll>
          <Meta date={date} onPhoto start={900} />
        </div>
      </header>
    );
  }

  // ---------- circle ----------
  return (
    <header className={cn("flex flex-col items-center gap-5 px-6 pb-14 pt-12 text-center", className)}>
      <Kicker>{kicker}</Kicker>
      <div className="relative w-[70%]">
        <span
          aria-hidden
          className="orbit-slow absolute -inset-3.5 rounded-full border border-dashed"
          style={{ borderColor: "color-mix(in srgb, var(--tpl-primary) 55%, transparent)" }}
        />
        <RevealOnScroll variant="zoomIn" duration={1200}>
          <PhotoFrame src={photo} variant="circle" focus="50% 30%" />
        </RevealOnScroll>
      </div>
      <RevealOnScroll variant="up" delay={300}>
        <Names groom={groom} bride={bride} size="13cqw" />
      </RevealOnScroll>
      <Meta date={date} quote={quote} start={600} />
    </header>
  );
}
