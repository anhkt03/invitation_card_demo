"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { revealProps, type RevealOptions, type RevealVariant } from "./reveal";
import { useInView } from "./useInView";

type Props = RevealOptions & {
  children: ReactNode;
  /** Kiểu xuất hiện — mặc định "up" (trượt lên nhẹ + mờ → rõ). */
  variant?: RevealVariant;
  /** false: ẩn lại khi cuộn ra khỏi khung, vào lại thì chạy lại. */
  once?: boolean;
  className?: string;
  /** Style bổ sung (vd vị trí tuyệt đối). Các biến animation của reveal luôn được giữ. */
  style?: CSSProperties;
  as?: ElementType;
};

/**
 * Khối nội dung xuất hiện khi cuộn tới — dùng chung cho mọi template.
 * Cuộn tới đâu hiện animation tới đó; tự tắt khi người dùng bật "giảm chuyển động".
 */
export default function RevealOnScroll({
  children,
  variant = "up",
  delay = 0,
  duration,
  distance,
  once = true,
  className = "",
  style,
  as: Tag = "div",
}: Props) {
  const { ref, visible } = useInView<HTMLElement>({ once });
  const rv = revealProps(variant, visible, { delay, duration, distance });

  return (
    <Tag
      ref={ref}
      data-visible={rv["data-visible"]}
      style={{ ...style, ...rv.style }}
      className={`${rv.className} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
