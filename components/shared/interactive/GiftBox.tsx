"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useOpenable } from "./useOpenable";

const EASE = "cubic-bezier(.22,.8,.3,1)";

/** Hướng bay (px) của các trái tim khi hộp vừa mở. */
const BURST: [number, number][] = [
  [-72, -96],
  [-38, -128],
  [0, -142],
  [38, -128],
  [72, -96],
  [-100, -54],
  [100, -54],
  [18, -108],
];

type Props = {
  /** Nội dung trồi lên từ hộp (vd các thẻ QR mừng cưới). */
  children: ReactNode;
  /** Dòng gợi ý khi hộp còn đóng. */
  hint?: string;
  closeLabel?: string;
  defaultOpen?: boolean;
  /** Tự mở khi cuộn tới. */
  openOnView?: boolean;
  className?: string;
};

function Bow({ fill, knot }: { fill: string; knot: string }) {
  return (
    <svg width="92" height="54" viewBox="0 0 92 54" aria-hidden>
      <path d="M46 44C14 56 -2 12 22 8C38 5 43 28 46 44Z" fill={fill} />
      <path d="M46 44C78 56 94 12 70 8C54 5 49 28 46 44Z" fill={fill} />
      <path d="M46 44C34 48 26 54 20 52M46 44C58 48 66 54 72 52" stroke={fill} strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="46" cy="42" r="7" fill={knot} />
    </svg>
  );
}

/**
 * Hộp mừng cưới: chạm vào, nắp hộp bật lên, tim bay ra và nội dung bên trong
 * trồi lên. Màu hộp theo palette (--tpl-primary / --tpl-accent).
 */
export default function GiftBox({
  children,
  hint = "Chạm vào hộp quà để mở",
  closeLabel = "Đóng hộp lại",
  defaultOpen = false,
  openOnView = false,
  className = "",
}: Props) {
  const { ref, open, toggle } = useOpenable({ defaultOpen, openOnView });

  const ribbon = "color-mix(in srgb, var(--tpl-accent) 50%, #fff)";
  const knot = "color-mix(in srgb, var(--tpl-accent) 85%, #000)";
  const lidBg = "color-mix(in srgb, var(--tpl-primary) 80%, #fff)";

  return (
    <div ref={ref} className={cn("flex flex-col items-center", className)}>
      {/* Nội dung trồi lên từ miệng hộp */}
      <div
        className="grid w-full"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: `grid-template-rows 900ms ${EASE} 250ms`,
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="pb-5"
            style={{
              transform: open ? "none" : "translateY(54px) scale(0.95)",
              opacity: open ? 1 : 0,
              transition: `transform 900ms ${EASE} 380ms, opacity 700ms ease 380ms`,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? closeLabel : hint}
        className={cn("relative mt-1 block h-[158px] w-[180px] cursor-pointer", !open && "animate-wiggle")}
      >
        {/* Tim bay ra khi mở */}
        {open && (
          <span aria-hidden className="pointer-events-none absolute left-1/2 top-[34px]">
            {BURST.map(([x, y], i) => (
              <svg
                key={i}
                className="burst-heart absolute -left-2.5 -top-2.5"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={
                  {
                    "--bx": `${x}px`,
                    "--by": `${y}px`,
                    animationDelay: `${300 + i * 70}ms`,
                    color: i % 2 ? "var(--tpl-accent)" : "var(--tpl-primary)",
                  } as CSSProperties
                }
              >
                <path
                  d="M12 21s-7.5-4.9-10-9.2C.4 8.7 2 5.5 5.2 5.5c2 0 3.3 1.2 4.1 2.4C10.1 6.7 11.4 5.5 13.4 5.5c3.2 0 4.8 3.2 3.2 6.3C22 16.1 12 21 12 21Z"
                  fill="currentColor"
                />
              </svg>
            ))}
          </span>
        )}

        {/* Thân hộp */}
        <span
          className="absolute bottom-0 left-[15px] h-[108px] w-[150px] rounded-b-md shadow-[0_12px_24px_rgba(0,0,0,.2)]"
          style={{ background: "var(--tpl-primary)" }}
        >
          <span
            className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2"
            style={{ background: ribbon }}
          />
          <span
            className="absolute inset-x-0 top-0 h-3 bg-black/20"
            style={{ opacity: open ? 1 : 0, transition: "opacity .4s" }}
          />
        </span>

        {/* Nắp + nơ: bật lên và nghiêng khi mở */}
        <span
          className="absolute left-0 top-[26px] z-10 block h-[40px] w-[180px]"
          style={{
            transform: open ? "translate(52px,-58px) rotate(20deg)" : "none",
            transformOrigin: "100% 100%",
            transition: `transform 800ms ${EASE}`,
          }}
        >
          <span
            className="absolute inset-0 rounded-md shadow-[0_6px_12px_rgba(0,0,0,.18)]"
            style={{ background: lidBg }}
          />
          <span
            className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2"
            style={{ background: ribbon }}
          />
          <span className="absolute -top-[34px] left-1/2 -translate-x-1/2">
            <Bow fill={ribbon} knot={knot} />
          </span>
        </span>
      </button>

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
