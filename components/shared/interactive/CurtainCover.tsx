"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useOpenable } from "./useOpenable";

const CURTAIN_EASE = "cubic-bezier(.7,0,.2,1)";
const SCALLOPS = 9;

/** Diềm rèm cong nhiều múi ở mép trên — sinh bằng cung tròn SVG. */
function valancePath(): string {
  const w = 390 / SCALLOPS;
  let d = "M0 0H390V26";
  for (let i = 1; i <= SCALLOPS; i++) d += `A${w / 2} 28 0 0 1 ${390 - i * w} 26`;
  return `${d}Z`;
}

const pleats: CSSProperties = {
  backgroundColor: "var(--tpl-primary)",
  backgroundImage: [
    "repeating-linear-gradient(90deg, rgba(0,0,0,.34) 0px, rgba(0,0,0,0) 15px, rgba(255,255,255,.1) 29px, rgba(0,0,0,.34) 44px)",
    "linear-gradient(180deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,.45) 100%)",
  ].join(","),
};

type Props = {
  /** Nội dung sân khấu phía sau rèm. Dạng hàm để biết lúc nào rèm đã mở và chạy animation theo. */
  children: ReactNode | ((open: boolean) => ReactNode);
  openLabel?: string;
  defaultOpen?: boolean;
  /** Tự mở rèm khi cuộn tới. */
  openOnView?: boolean;
  /** Báo ra ngoài khi rèm mở/đóng (vd để bật auto-scroll sau khi rèm đã mở). */
  onOpenChange?: (open: boolean) => void;
  /** Tỉ lệ khung (rộng/cao). */
  ratio?: string;
  className?: string;
};

/**
 * Màn bìa dạng rèm sân khấu: hai cánh rèm nhung khép kín, chạm vào thì rút gọn
 * sang hai bên để lộ nội dung phía sau. Màu rèm theo --tpl-primary, viền vàng theo --tpl-accent.
 */
export default function CurtainCover({
  children,
  openLabel = "Chạm để mở màn",
  defaultOpen = false,
  openOnView = false,
  onOpenChange,
  ratio = "390/720",
  className = "",
}: Props) {
  const { ref, open, setOpen } = useOpenable({
    defaultOpen,
    openOnView,
    openDelay: 700,
    onOpenChange,
  });

  const side = (dir: "l" | "r"): CSSProperties => ({
    ...pleats,
    transformOrigin: dir === "l" ? "left center" : "right center",
    transform: open ? "scaleX(0.3)" : "scaleX(1)",
    transition: `transform 2000ms ${CURTAIN_EASE}`,
    boxShadow:
      dir === "l"
        ? "inset -5px 0 0 color-mix(in srgb, var(--tpl-accent) 85%, #fff), 6px 0 22px rgba(0,0,0,.4)"
        : "inset 5px 0 0 color-mix(in srgb, var(--tpl-accent) 85%, #fff), -6px 0 22px rgba(0,0,0,.4)",
  });

  const fringe = (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-2.5"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--tpl-accent) 0 3px, transparent 3px 7px)",
      }}
    />
  );

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        aspectRatio: ratio,
        background: "color-mix(in srgb, var(--tpl-primary) 30%, #000)",
      }}
    >
      {/* Sân khấu phía sau rèm */}
      <div className="absolute inset-0">
        {typeof children === "function" ? children(open) : children}
      </div>

      {/* Hai cánh rèm */}
      <div className="absolute inset-y-0 left-0 z-20 w-1/2" style={side("l")}>
        {fringe}
      </div>
      <div className="absolute inset-y-0 right-0 z-20 w-1/2" style={side("r")}>
        {fringe}
      </div>

      {/* Diềm rèm phía trên */}
      <svg
        aria-hidden
        viewBox="0 0 390 56"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 z-30 h-[7.5%] w-full drop-shadow-[0_6px_6px_rgba(0,0,0,.35)]"
      >
        <path d={valancePath()} fill="color-mix(in srgb, var(--tpl-primary) 82%, #000)" />
        <path
          d={valancePath()}
          fill="none"
          stroke="var(--tpl-accent)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Nút mở màn */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={openLabel}
          className="absolute inset-0 z-40 grid cursor-pointer place-items-center"
        >
          <span
            className="tpl-heading relative rounded-full border px-6 py-3 text-sm tracking-[0.2em] uppercase shadow-lg"
            style={{
              color: "var(--tpl-primary)",
              background: "color-mix(in srgb, var(--tpl-surface) 94%, transparent)",
              borderColor: "var(--tpl-accent)",
            }}
          >
            <span
              aria-hidden
              className="animate-ping-soft absolute inset-0 rounded-full border"
              style={{ borderColor: "var(--tpl-accent)" }}
            />
            {openLabel}
          </span>
        </button>
      )}
    </div>
  );
}
