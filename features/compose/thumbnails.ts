import type { TemplateCategory } from "@/components/templates/types";

// ============================================================================
// ẢNH THUMBNAIL CHO TEMPLATE — nơi DUY NHẤT để đổi ảnh.
//
// Mặc định dùng ảnh thật miễn phí bản quyền theo chủ đề (không lấy từ Google
// Images vì vướng bản quyền). ĐỂ THAY ẢNH cho một template:
//   1) Bỏ file ảnh vào  public/templates/thumbs/  (vd wedding-1.jpg)
//   2) Thêm dòng vào OVERRIDES:  "WeddingC1": "/templates/thumbs/wedding-1.jpg"
// Ảnh trong OVERRIDES luôn được ưu tiên.
// ============================================================================

/** Từ khoá chủ đề cho ảnh mặc định theo category. */
const KEYWORD: Record<TemplateCategory, string> = {
  wedding: "wedding,couple",
  graduation: "graduation,student",
  birthday: "birthday,cake",
  "grand-opening": "storefront,celebration",
};

/** key template → đường dẫn ảnh tự bỏ vào (ưu tiên nếu có). */
export const THUMB_OVERRIDES: Record<string, string> = {
  // "WeddingC1": "/templates/thumbs/wedding-1.jpg",
};

/**
 * Ảnh mặc định: ảnh thật theo chủ đề, cố định theo seed (mỗi template một ảnh
 * riêng nhưng không đổi mỗi lần tải). Nguồn LoremFlickr (ảnh Flickr CC).
 */
export function thumbFor(
  key: string,
  category: TemplateCategory,
  seed: number,
): string {
  return (
    THUMB_OVERRIDES[key] ??
    `https://loremflickr.com/600/800/${KEYWORD[category]}?lock=${seed}`
  );
}

/** Ảnh thật dự phòng (Picsum CDN — nhanh, ổn định) khi ảnh chủ đề lỗi. */
export function thumbPhotoFallback(key: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(key)}/600/800`;
}

/** Màu đại diện category — dùng cho ảnh dự phòng khi ảnh thật không tải được. */
const CATEGORY_COLOR: Record<TemplateCategory, [string, string]> = {
  wedding: ["#f3dfe0", "#b76e79"],
  graduation: ["#dbe4f0", "#2f4d7e"],
  birthday: ["#fbe4ef", "#d96896"],
  "grand-opening": ["#f6e2d5", "#b3282d"],
};

/** Ảnh dự phòng (SVG gradient) khi ảnh thật lỗi mạng — không bao giờ để vỡ ảnh. */
export function thumbFallback(category: TemplateCategory, name: string): string {
  const [bg, fg] = CATEGORY_COLOR[category];
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='0.4' y2='1'>` +
    `<stop offset='0' stop-color='${bg}'/><stop offset='1' stop-color='${fg}'/>` +
    `</linearGradient></defs>` +
    `<rect width='600' height='800' fill='url(#g)'/>` +
    `<text x='300' y='420' text-anchor='middle' font-family='sans-serif' ` +
    `font-size='30' fill='#ffffff' opacity='0.9'>${name}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
