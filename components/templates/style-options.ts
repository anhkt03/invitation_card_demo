import type { CSSProperties } from "react";
import type {
  TemplateFontOption,
  TemplateMeta,
  TemplateStyleConfig,
} from "./types";

// Pool tùy chỉnh dùng chung cho mọi template — khách (preview) và Admin (tạo
// thiệp) đều chọn từ đây. Mọi font đều có subset tiếng Việt (xem lib/fonts.ts).

/** Phông chữ tiêu đề (heading) — nét trang trí, dùng cho tên/tựa lớn. */
export const HEADING_FONT_OPTIONS: TemplateFontOption[] = [
  { id: "playfair", name: "Playfair", cssValue: "var(--font-playfair)" },
  { id: "cormorant", name: "Cormorant", cssValue: "var(--font-cormorant)" },
  { id: "quicksand", name: "Quicksand", cssValue: "var(--font-quicksand)" },
  { id: "dancing", name: "Dancing", cssValue: "var(--font-dancing)" },
  { id: "be_vietnam", name: "Be Vietnam", cssValue: "var(--font-be-vietnam)" },
];

/** Phông chữ nội dung (body) — dễ đọc, dùng cho đoạn văn dài. */
export const BODY_FONT_OPTIONS: TemplateFontOption[] = [
  { id: "be_vietnam", name: "Be Vietnam", cssValue: "var(--font-be-vietnam)" },
  { id: "quicksand", name: "Quicksand", cssValue: "var(--font-quicksand)" },
  { id: "cormorant", name: "Cormorant", cssValue: "var(--font-cormorant)" },
];

/** Cỡ chữ tổng thể — nhân vào biến --tpl-scale (xem globals.css). */
export type ScaleId = "sm" | "md" | "lg";
export const SCALE_OPTIONS: { id: ScaleId; name: string; value: number }[] = [
  { id: "sm", name: "Nhỏ", value: 0.9 },
  { id: "md", name: "Vừa", value: 1 },
  { id: "lg", name: "Lớn", value: 1.12 },
];

export const DEFAULT_BODY_FONT = "be_vietnam";
export const DEFAULT_SCALE: ScaleId = "md";

/**
 * Gom toàn bộ tùy chỉnh (màu + font + cỡ chữ) thành các CSS variable --tpl-*
 * đặt trên wrapper template. Shared component chỉ đọc biến nên tự ăn theo.
 */
export function buildStyleVars(
  meta: TemplateMeta,
  style: TemplateStyleConfig,
): CSSProperties {
  const palette = meta.palettes[style.palette] ?? meta.palettes[0];
  const heading = meta.fonts.find((f) => f.id === style.heading_font) ?? meta.fonts[0];
  const body =
    BODY_FONT_OPTIONS.find((f) => f.id === style.body_font) ??
    BODY_FONT_OPTIONS[0];
  const scale = SCALE_OPTIONS.find((s) => s.id === style.scale)?.value ?? 1;

  return {
    "--tpl-primary": palette.colors.primary,
    "--tpl-accent": palette.colors.accent,
    "--tpl-bg": palette.colors.bg,
    "--tpl-surface": palette.colors.surface,
    "--tpl-text": palette.colors.text,
    "--tpl-muted": palette.colors.muted,
    "--tpl-font-heading": heading.cssValue,
    "--tpl-font-script": "var(--font-dancing)",
    "--tpl-font-body": body.cssValue,
    "--tpl-scale": String(scale),
  } as CSSProperties;
}
