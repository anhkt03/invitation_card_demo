"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useOpenable } from "./useOpenable";

const EASE = "cubic-bezier(.22,.8,.3,1)";

type Props = {
  /** Nội dung lá thư hiện ra sau khi mở (lời mời, tên, ngày giờ...). */
  children: ReactNode;
  /** Dòng gợi ý khi hòm thư còn đóng. */
  hint?: string;
  closeLabel?: string;
  /** Chữ trên con dấu sáp của lá thư (vd "K&H"). */
  sealLabel?: string;
  defaultOpen?: boolean;
  /** Tự mở khi cuộn tới. */
  openOnView?: boolean;
  className?: string;
};

/**
 * Hòm thư: chạm vào, cờ báo thư dựng lên, phong thư bay ra khỏi khe và lá thư
 * mở ra bên dưới. Hòm thư vẽ bằng SVG, màu theo palette.
 */
export default function MailboxReveal({
  children,
  hint = "Chạm vào hòm thư — có thư mời dành cho bạn",
  closeLabel = "Gấp thư lại",
  sealLabel,
  defaultOpen = false,
  openOnView = false,
  className = "",
}: Props) {
  const { ref, open, toggle } = useOpenable({ defaultOpen, openOnView });

  return (
    <div ref={ref} className={cn("flex flex-col items-center", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? closeLabel : hint}
        className="relative block w-[190px] cursor-pointer"
      >
        <svg viewBox="0 0 230 250" className="block h-auto w-full overflow-visible" aria-hidden>
          {/* Cột */}
          <rect x="104" y="150" width="22" height="96" rx="3" fill="color-mix(in srgb, var(--tpl-muted) 70%, #000)" />
          <rect x="84" y="240" width="62" height="8" rx="4" fill="color-mix(in srgb, var(--tpl-muted) 55%, #000)" />

          {/* Phong thư bay ra khỏi khe (chỉ chạy khi mở) */}
          {open && (
            <g className="animate-mail-out">
              <rect x="82" y="92" width="66" height="44" rx="3" fill="#fffaf0" stroke="rgba(0,0,0,.12)" />
              <path d="M82 94l33 24 33-24" fill="none" stroke="rgba(0,0,0,.18)" />
              <circle cx="115" cy="114" r="6" fill="var(--tpl-accent)" />
            </g>
          )}

          {/* Thân hòm thư */}
          <path
            d="M32 150V98C32 62 62 38 115 38C168 38 198 62 198 98V150Z"
            fill="var(--tpl-primary)"
          />
          <path
            d="M32 98C32 62 62 38 115 38"
            fill="none"
            stroke="rgba(255,255,255,.28)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M52 150V104C52 80 76 60 115 60C154 60 178 80 178 104V150"
            fill="none"
            stroke="rgba(255,255,255,.3)"
            strokeWidth="3"
          />
          <rect x="30" y="146" width="170" height="10" rx="3" fill="color-mix(in srgb, var(--tpl-primary) 70%, #000)" />
          {/* Khe thư + nhãn */}
          <rect x="78" y="106" width="74" height="10" rx="5" fill="rgba(0,0,0,.55)" />
          <rect x="94" y="126" width="42" height="14" rx="3" fill="color-mix(in srgb, var(--tpl-surface) 90%, transparent)" />
          <path d="M104 133h22" stroke="var(--tpl-primary)" strokeWidth="2" strokeLinecap="round" />

          {/* Cờ báo thư: nằm xuống → dựng lên */}
          <g
            style={{
              transformOrigin: "205px 124px",
              transform: open ? "rotate(0deg)" : "rotate(104deg)",
              transition: `transform 800ms ${EASE} 150ms`,
            }}
          >
            <rect x="201" y="74" width="8" height="52" rx="3" fill="var(--tpl-accent)" />
            <path d="M209 74h26v18h-26Z" fill="var(--tpl-accent)" />
            <path d="M209 74h26v18h-26Z" fill="rgba(255,255,255,.2)" />
          </g>
          <circle cx="205" cy="124" r="6" fill="color-mix(in srgb, var(--tpl-primary) 60%, #000)" />
        </svg>
      </button>

      {/* Lá thư mở ra bên dưới hòm thư */}
      <div
        className="grid w-full"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: `grid-template-rows 1000ms ${EASE} 700ms`,
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="relative px-3 pt-8"
            style={{
              transform: open ? "none" : "translateY(-40px) scale(0.9)",
              opacity: open ? 1 : 0,
              transition: `transform 1000ms ${EASE} 800ms, opacity 800ms ease 800ms`,
            }}
          >
            <div
              className="relative rounded-md px-5 pb-7 pt-10 text-center shadow-[0_14px_30px_rgba(0,0,0,.12)]"
              style={{
                background: "var(--tpl-surface)",
                border:
                  "1px solid color-mix(in srgb, var(--tpl-primary) 22%, transparent)",
              }}
            >
              {sealLabel && (
                <span
                  className="tpl-heading absolute left-1/2 top-0 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] text-lg font-semibold text-white shadow-md"
                  style={{
                    background: "var(--tpl-accent)",
                    borderColor: "color-mix(in srgb, var(--tpl-accent) 80%, #000)",
                  }}
                >
                  {sealLabel}
                </span>
              )}
              {children}
            </div>
          </div>
        </div>
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
          <>
            <span className="relative mr-2 inline-flex size-2 align-middle">
              <span
                className="animate-ping-soft absolute inline-flex size-full rounded-full"
                style={{ background: "var(--tpl-accent)" }}
              />
              <span
                className="relative inline-flex size-2 rounded-full"
                style={{ background: "var(--tpl-accent)" }}
              />
            </span>
            {hint}
          </>
        )}
      </p>
    </div>
  );
}
