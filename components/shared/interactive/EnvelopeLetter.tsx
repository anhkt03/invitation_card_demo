"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useOpenable } from "./useOpenable";

const EASE = "cubic-bezier(.22,.8,.3,1)";

type Props = {
  /** Nội dung tấm thiệp trượt lên khỏi phong bì. */
  children: ReactNode;
  /** Chữ trên con dấu sáp, vd "K&H". */
  sealLabel?: string;
  /** Chữ nhỏ trên mặt phong bì khi còn đóng. */
  hint?: string;
  closeLabel?: string;
  defaultOpen?: boolean;
  /** Tự mở khi cuộn tới. */
  openOnView?: boolean;
  className?: string;
};

// Sắc phong bì suy ra từ palette để ăn theo màu template.
const paper = (pct: number) =>
  `color-mix(in srgb, var(--tpl-primary) ${pct}%, var(--tpl-surface))`;

const fill = (clip: string, bg: string): CSSProperties => ({
  background: bg,
  clipPath: clip,
});

/**
 * Phong thư nằm ngay trong trang: chạm con dấu → nắp lật lên, tấm thiệp trượt
 * ra phía trên (phần đáy của thiệp được túi phong bì che lại cho giống đang rút ra).
 */
export default function EnvelopeLetter({
  children,
  sealLabel = "♥",
  hint = "Chạm vào con dấu để mở thiệp",
  closeLabel = "Gấp thiệp lại",
  defaultOpen = false,
  openOnView = false,
  className = "",
}: Props) {
  const { ref, open, toggle } = useOpenable({ defaultOpen, openOnView });

  return (
    <div ref={ref} className={cn("mx-auto w-full max-w-[360px]", className)}>
      {/* Tấm thiệp — cao dần khi mở, đáy lọt sau túi phong bì */}
      <div
        className="grid"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: `grid-template-rows 1100ms ${EASE} 450ms`,
        }}
      >
        <div className="relative z-[2] min-h-0 overflow-hidden">
          <div
            className="px-3"
            style={{
              transform: open ? "none" : "translateY(46%)",
              opacity: open ? 1 : 0,
              transition: `transform 1100ms ${EASE} 450ms, opacity 700ms ease 450ms`,
            }}
          >
            <div
              className="rounded-t-md px-5 pb-[34%] pt-8 text-center shadow-[0_-4px_24px_rgba(0,0,0,.08)]"
              style={{
                background: "var(--tpl-surface)",
                border:
                  "1px solid color-mix(in srgb, var(--tpl-primary) 20%, transparent)",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Phong bì */}
      <div
        className="relative aspect-[34/22] w-full"
        style={{
          // Khi mở, phong bì kéo lên chồng vào đáy tấm thiệp để thiệp trông như đang nằm trong túi.
          marginTop: open ? "-30%" : "-3px",
          transition: `margin-top 1100ms ${EASE} 450ms`,
        }}
      >
        {/* Lưng phong bì */}
        <div className="absolute inset-0 rounded-md" style={{ background: paper(22) }} />

        {/* Nắp: lật lên khi mở, rồi chìm ra sau tấm thiệp */}
        <div
          className="absolute inset-x-0 top-0 h-[64%]"
          style={{
            transformOrigin: "top center",
            transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
            transition: "transform 650ms ease, z-index 0s linear 0.32s",
            zIndex: open ? 1 : 5,
            ...fill("polygon(0 0, 100% 0, 50% 100%)", open ? paper(30) : paper(26)),
          }}
        />

        {/* Túi phía trước: hai cánh bên + cánh đáy */}
        <div className="absolute inset-0 z-[3] rounded-md" style={fill("polygon(0 0, 52% 56%, 0 100%)", paper(16))} />
        <div className="absolute inset-0 z-[3] rounded-md" style={fill("polygon(100% 0, 48% 56%, 100% 100%)", paper(16))} />
        <div className="absolute inset-0 z-[3] rounded-md" style={fill("polygon(0 100%, 50% 46%, 100% 100%)", paper(10))} />

        {/* Con dấu sáp */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? closeLabel : hint}
          className="tpl-heading absolute left-1/2 top-[50%] z-[6] grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] text-xl font-semibold text-white shadow-[0_4px_12px_rgba(0,0,0,.28)] transition-all duration-500 hover:scale-105"
          style={{
            background: "var(--tpl-accent)",
            borderColor: "color-mix(in srgb, var(--tpl-accent) 78%, #000)",
            opacity: open ? 0 : 1,
            pointerEvents: open ? "none" : "auto",
            transform: open
              ? "translate(-50%,-50%) scale(0.4)"
              : "translate(-50%,-50%)",
          }}
        >
          {!open && (
            <span
              aria-hidden
              className="animate-ping-soft absolute inset-0 rounded-full"
              style={{ background: "var(--tpl-accent)" }}
            />
          )}
          <span className="relative">{sealLabel}</span>
        </button>
      </div>

      <p
        className="mt-3 text-center text-xs tracking-wide"
        style={{ color: "var(--tpl-muted)" }}
      >
        {open ? (
          <button type="button" onClick={toggle} className="underline underline-offset-4">
            {closeLabel}
          </button>
        ) : (
          hint
        )}
      </p>
    </div>
  );
}
