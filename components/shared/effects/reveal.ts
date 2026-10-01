import type { CSSProperties } from "react";

/**
 * Các kiểu xuất hiện khi cuộn tới (xem class .reveal trong globals.css):
 * - fade     mờ → rõ dần
 * - blur     nhoè → nét dần (kèm mờ → rõ)
 * - up/down  trượt lên / trượt xuống vào vị trí
 * - left     trượt vào từ bên TRÁI · right: trượt vào từ bên PHẢI
 * - zoomIn   phóng to dần từ nhỏ → đúng cỡ
 * - zoomOut  thu nhỏ dần từ lớn → đúng cỡ
 */
export type RevealVariant =
  | "fade"
  | "blur"
  | "up"
  | "down"
  | "left"
  | "right"
  | "zoomIn"
  | "zoomOut";

export type RevealOptions = {
  /** Trễ (ms) — dùng để xếp các khối nối tiếp nhau. */
  delay?: number;
  /** Thời lượng (ms). */
  duration?: number;
  /** Quãng trượt cho up/down/left/right: số = px, chuỗi = đơn vị CSS (vd "60%"). */
  distance?: number | string;
};

const DEFAULT_DISTANCE: Record<"up" | "down" | "left" | "right", string> = {
  up: "28px",
  down: "28px",
  left: "56px",
  right: "56px",
};

function fromState(variant: RevealVariant, distance?: number | string) {
  const d = (key: keyof typeof DEFAULT_DISTANCE) =>
    distance === undefined
      ? DEFAULT_DISTANCE[key]
      : typeof distance === "number"
        ? `${distance}px`
        : distance;

  switch (variant) {
    case "up":
      return { transform: `translate3d(0, ${d("up")}, 0)` };
    case "down":
      return { transform: `translate3d(0, calc(${d("down")} * -1), 0)` };
    case "left":
      return { transform: `translate3d(calc(${d("left")} * -1), 0, 0)` };
    case "right":
      return { transform: `translate3d(${d("right")}, 0, 0)` };
    case "zoomIn":
      return { transform: "scale(0.82)" };
    case "zoomOut":
      return { transform: "scale(1.22)" };
    case "blur":
      return { transform: "scale(1.04)", filter: "blur(14px)" };
    case "fade":
    default:
      return { transform: "none" };
  }
}

/**
 * Props cần rải lên phần tử để nó tự animate theo cờ `visible`
 * (kết hợp với `useInView`). Dùng khi một lần quan sát điều khiển nhiều
 * phần tử con cùng lúc, vd hai ảnh cô dâu chú rể trượt vào giữa.
 *
 * Lưu ý: đừng đặt lên phần tử đã có `transform` riêng — hãy bọc thêm một lớp.
 */
export function revealProps(
  variant: RevealVariant,
  visible: boolean,
  { delay = 0, duration, distance }: RevealOptions = {},
): { className: string; "data-visible": "true" | "false"; style: CSSProperties } {
  const from = fromState(variant, distance);
  return {
    className: "reveal",
    "data-visible": visible ? "true" : "false",
    style: {
      "--rv-from": from.transform,
      "--rv-filter": "filter" in from ? from.filter : "none",
      "--rv-delay": `${delay}ms`,
      ...(duration ? { "--rv-dur": `${duration}ms` } : null),
    } as CSSProperties,
  };
}
