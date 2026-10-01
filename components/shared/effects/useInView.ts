"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** true: chỉ phát animation một lần (mặc định). false: ẩn lại khi cuộn ra khỏi khung. */
  once?: boolean;
  /** Tỉ lệ diện tích phần tử phải lọt vào khung nhìn mới tính là "đã thấy". */
  threshold?: number;
  /** Lùi mép dưới khung nhìn lại một chút để animation chạy khi phần tử đã vào hẳn màn hình. */
  rootMargin?: string;
};

/**
 * Theo dõi một phần tử đã cuộn vào khung nhìn chưa. Hoạt động cả khi nội dung
 * nằm trong khung cuộn riêng (vd khung điện thoại ở trang xem thử), vì
 * IntersectionObserver tính theo mọi vùng cắt (overflow) của phần tử cha.
 */
export function useInView<T extends Element = HTMLDivElement>({
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px",
}: Options = {}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, visible };
}
