import { twMerge } from "tailwind-merge";

/**
 * Gộp class Tailwind, class truyền sau LUÔN thắng khi xung đột (vd text-3xl vs
 * text-5xl). Nhờ đó mọi component đặt class mặc định nhưng vẫn cho phép chỉnh
 * size/style từ ngoài chỉ bằng cách truyền className.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
