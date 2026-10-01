import type { RevealVariant } from "@/components/shared/effects/reveal";

/**
 * Bộ kiểu animation khi cuộn tới cho từng vai trò trong thiệp — mỗi template chọn
 * một bộ để có "chất" riêng (xem RevealVariant).
 * - heading  tiêu đề section
 * - block    khối nội dung (thẻ, lịch, danh sách…)
 * - sideA    mục lẻ (trượt từ trái) · sideB mục chẵn (trượt từ phải)
 * - media    ảnh
 */
export type Motion = {
  heading: RevealVariant;
  block: RevealVariant;
  sideA: RevealVariant;
  sideB: RevealVariant;
  media: RevealVariant;
};

export const MOTION = {
  /** Nhẹ nhàng: mờ → rõ, trượt lên, ảnh phóng to dần. */
  soft: { heading: "fade", block: "up", sideA: "left", sideB: "right", media: "zoomIn" },
  /** Kịch tính: nhoè → nét, phóng to/thu nhỏ, trượt ngang. */
  dramatic: { heading: "blur", block: "zoomIn", sideA: "left", sideB: "right", media: "zoomOut" },
  /** Êm: mọi thứ trồi lên từ dưới, ảnh nhoè → nét. */
  gentle: { heading: "up", block: "fade", sideA: "up", sideB: "up", media: "blur" },
  /** Trượt ngang liên tục. */
  slide: { heading: "left", block: "right", sideA: "left", sideB: "right", media: "zoomIn" },
} satisfies Record<string, Motion>;
