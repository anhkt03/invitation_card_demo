"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  /** Kích thước "thiết kế" của sân khấu (px) — nội dung bên trong dàn theo px trên khung này. */
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
};

/**
 * Sân khấu kích thước cố định co giãn theo bề rộng khung chứa (transform scale).
 * Dùng cho khối dàn bố cục tuyệt đối theo px (vd phong thư) để trông giống hệt
 * thiết kế trên mọi cỡ màn hình, kể cả khung xem trước hẹp.
 */
export default function ScaledStage({
  width,
  height,
  children,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height: height * scale }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
