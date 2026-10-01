"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type AutoScrollSpeed = "slow" | "normal" | "fast";

export const AUTO_SCROLL_SPEEDS: { value: AutoScrollSpeed; label: string }[] = [
  { value: "slow", label: "Chậm" },
  { value: "normal", label: "Vừa" },
  { value: "fast", label: "Nhanh" },
];

/** Tốc độ cuộn (px/giây). */
const PX_PER_SEC: Record<AutoScrollSpeed, number> = {
  slow: 34,
  normal: 56,
  fast: 88,
};

type Props = {
  /** Bật tính năng: nút điều khiển xuất hiện và thiệp tự trượt xuống cho khách xem. */
  enabled: boolean;
  speed?: AutoScrollSpeed;
  /**
   * Đã sẵn sàng tự chạy chưa — để false khi bìa (rèm, phong thư...) còn đóng, tránh
   * trượt vượt qua nó. Khách vẫn bấm nút để chạy tay được.
   */
  ready?: boolean;
  /** Trễ (ms) từ lúc sẵn sàng tới khi tự chạy. */
  startDelay?: number;
  className?: string;
};

/** Tìm phần tử đang cuộn nội dung thiệp: khung cuộn cha gần nhất, không có thì là trang. */
function findScroller(from: HTMLElement | null): HTMLElement | null {
  for (let el = from?.parentElement; el; el = el.parentElement) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight + 1) {
      return el;
    }
  }
  return document.scrollingElement as HTMLElement | null;
}

/**
 * Tự trượt thiệp xuống cho khách xem (hands-free). Đặt ở cuối cột nội dung của template —
 * nút nổi dính đáy khung nhìn (sticky, nên vẫn nằm gọn trong khung điện thoại ở trang xem thử).
 * Tự dừng khi khách chạm / cuộn tay / bấm phím, hoặc khi tới cuối trang; bấm nút để tiếp tục.
 */
export default function AutoScroll({
  enabled,
  speed = "normal",
  ready = true,
  startDelay = 2500,
  className = "",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const active = enabled && playing;

  // Tự chạy khi đã sẵn sàng (trừ khi khách bật "giảm chuyển động").
  useEffect(() => {
    if (!enabled || !ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setPlaying(true), startDelay);
    return () => clearTimeout(id);
  }, [enabled, ready, startDelay]);

  // Vòng lặp cuộn.
  useEffect(() => {
    if (!active) return;
    const scroller = findScroller(rootRef.current);
    if (!scroller) return;
    const isDoc = scroller === document.scrollingElement;
    const listenOn: EventTarget = isDoc ? window : scroller;

    let pos = scroller.scrollTop;
    let last = performance.now();
    let raf = 0;
    const maxTop = () => scroller.scrollHeight - scroller.clientHeight;

    const stop = () => setPlaying(false);
    const onUser = (e: Event) => {
      // Chạm vào chính nút điều khiển thì để onClick xử lý, không tính là "khách tự cuộn".
      if (e.target instanceof Node && buttonRef.current?.contains(e.target)) return;
      stop();
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      // Vị trí thật lệch hẳn so với dự kiến → khách vừa tự cuộn (kéo thanh cuộn...).
      if (Math.abs(scroller.scrollTop - pos) > 4) return stop();
      pos += (PX_PER_SEC[speed] * dt) / 1000;
      if (pos >= maxTop()) {
        scroller.scrollTo({ top: maxTop(), behavior: "instant" });
        return stop();
      }
      scroller.scrollTo({ top: pos, behavior: "instant" });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const events = ["wheel", "touchstart", "pointerdown"] as const;
    events.forEach((ev) => listenOn.addEventListener(ev, onUser, { passive: true }));
    window.addEventListener("keydown", onUser);
    return () => {
      cancelAnimationFrame(raf);
      events.forEach((ev) => listenOn.removeEventListener(ev, onUser));
      window.removeEventListener("keydown", onUser);
    };
  }, [active, speed]);

  const toggle = () => {
    if (active) return setPlaying(false);
    const scroller = findScroller(rootRef.current);
    // Đang ở cuối trang thì cuộn về đầu rồi chạy lại.
    if (scroller && scroller.scrollTop >= scroller.scrollHeight - scroller.clientHeight - 2) {
      scroller.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setPlaying(true), 900);
      return;
    }
    setPlaying(true);
  };

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className={cn("pointer-events-none sticky bottom-4 z-50 h-0", className)}
    >
      <div className="absolute bottom-0 right-3 pointer-events-auto">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          aria-pressed={active}
          className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-white shadow-lg backdrop-blur transition hover:brightness-110"
          style={{
            background: "color-mix(in srgb, var(--tpl-primary) 88%, transparent)",
            opacity: active ? 0.82 : 1,
          }}
        >
          {active ? (
            <Pause className="size-3.5" aria-hidden />
          ) : (
            <Play className="size-3.5" aria-hidden />
          )}
          {active ? "Dừng cuộn" : "Tự cuộn"}
        </button>
      </div>
    </div>
  );
}
