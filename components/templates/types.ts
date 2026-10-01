import type { ComponentType } from "react";

export type TemplateCategory =
  | "wedding"
  | "graduation"
  | "birthday"
  | "grand-opening";

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  wedding: "Thiệp cưới",
  graduation: "Lễ tốt nghiệp",
  birthday: "Sinh nhật",
  "grand-opening": "Khai trương",
};

/** Thứ tự ưu tiên hiển thị danh mục trên trang chủ. */
export const CATEGORY_ORDER: TemplateCategory[] = [
  "wedding",
  "graduation",
  "birthday",
  "grand-opening",
];

type FieldBase = {
  key: string;
  label: string;
  /** Nhóm hiển thị trong form nhập liệu (các field cùng group đứng chung một mục). */
  group: string;
  optional?: boolean;
  /** Gợi ý hiển thị dưới ô nhập. */
  hint?: string;
  /** Placeholder trong ô nhập; mặc định dùng giá trị default. */
  placeholder?: string;
};

/**
 * Khai báo field của template dưới dạng dữ liệu — một nguồn duy nhất sinh ra
 * form nhập liệu, placeholder và dữ liệu mẫu.
 *
 * Phân chia code ↔ DB (Template.FieldSchema, SRS FR-03/FR-63): DB chỉ lưu phần
 * FLEXIBLE, admin chỉnh được mà không cần deploy — `label`, `hint`, `placeholder`,
 * `maxLength`, và `required` (suy từ `optional`). Phần gắn chặt với component
 * (`key`, `type`, `group`, `rows`, `max`) và dữ liệu mẫu (`default`, URL ảnh) nằm
 * trong code (meta.ts + sample.json), KHÔNG đưa vào DB.
 */
export type FieldDef =
  | (FieldBase & { type: "text"; default: string; maxLength?: number })
  | (FieldBase & {
      type: "textarea";
      default: string;
      rows?: number;
      maxLength?: number;
    })
  | (FieldBase & { type: "datetime"; default: string })
  | (FieldBase & { type: "image"; default: string })
  | (FieldBase & { type: "gallery"; max: number; default: string[] })
  /** Công tắc bật/tắt — giá trị lưu dạng chuỗi "true" | "false". */
  | (FieldBase & { type: "toggle"; default: "true" | "false" })
  /** Chọn một trong các lựa chọn cố định — giá trị lưu là `value` của lựa chọn. */
  | (FieldBase & {
      type: "select";
      options: { value: string; label: string }[];
      default: string;
    });

export type GalleryFieldDef = Extract<FieldDef, { type: "gallery" }>;
export type ToggleFieldDef = Extract<FieldDef, { type: "toggle" }>;
export type SelectFieldDef = Extract<FieldDef, { type: "select" }>;

export type TemplatePalette = {
  name: string;
  colors: {
    primary: string;
    accent: string;
    bg: string;
    surface: string;
    text: string;
    muted: string;
  };
};

export type TemplateFontOption = {
  id: string;
  name: string;
  /** Giá trị CSS font-family, thường trỏ tới biến của next/font (vd "var(--font-playfair)"). */
  cssValue: string;
};

/**
 * Tùy chỉnh style người dùng chọn được (FR-12). Đây là LỰA CHỌN của từng thiệp (lưu ở Invitation.StyleConfig);
 * Template.StyleSchema trong DB chỉ giữ phần flexible là các cỡ chữ (scale) cho phép — palette/font nằm trong code.
 */
export type TemplateStyleConfig = {
  palette: number;
  /** id phông chữ tiêu đề (heading) trong meta.fonts. */
  heading_font: string;
  /** id phông chữ nội dung (body) trong BODY_FONT_OPTIONS; mặc định Be Vietnam. */
  body_font?: string;
  /** id cỡ chữ trong SCALE_OPTIONS ('sm'|'md'|'lg'); mặc định 'md'. */
  scale?: string;
  /** index ảnh nền trong meta.backgrounds; chỉ dùng cho template có nền chọn được. */
  background?: number;
};

/** Dữ liệu người dùng nhập; field bỏ trống sẽ fallback về default của FieldDef. */
export type TemplateData = Record<string, string | string[]>;

export type TemplateMeta = {
  /** Khớp Template.component_key trong SRS (FR-21) — dùng làm khóa registry và URL. */
  key: string;
  name: string;
  category: TemplateCategory;
  description: string;
  thumbnail: string;
  fields: FieldDef[];
  palettes: TemplatePalette[];
  fonts: TemplateFontOption[];
  /** Ảnh nền chọn được (tùy chọn) — template có nền sẵn thay cho ảnh cover tự tải. */
  backgrounds?: string[];
  defaultStyle: TemplateStyleConfig;
};

/**
 * Template là component "thuần hiển thị": nhận toàn bộ dữ liệu + style qua props,
 * không tự fetch, không tự chứa form — vì cùng một component sẽ render ở trang
 * xem mẫu, trang nhập thử và trang thiệp thật [slug] (FR-02, FR-21, FR-31).
 */
export type TemplateProps = {
  data: TemplateData;
  style: TemplateStyleConfig;
};

export type TemplateEntry = {
  meta: TemplateMeta;
  Component: ComponentType<TemplateProps>;
};

// ==================== HELPERS ====================

export function fieldMap(meta: TemplateMeta): Record<string, FieldDef> {
  return Object.fromEntries(meta.fields.map((f) => [f.key, f]));
}

/**
 * Giá trị text/textarea/datetime/image — đúng dữ liệu được truyền vào, thiếu thì "".
 * KHÔNG rơi về `default`: thiệp thật thiếu thông tin nào thì phần đó để trống/ẩn,
 * không được lộ nội dung mẫu của người khác. Muốn điền dữ liệu mẫu (trang nhập
 * thử) thì dùng `applyDefaults` ở nơi gọi.
 */
export function textValue(data: TemplateData, field: FieldDef | undefined): string {
  if (!field) return "";
  const raw = data[field.key];
  return typeof raw === "string" && raw.trim() !== "" ? raw : "";
}

/** Ảnh gallery theo thứ tự, bỏ slot trống, tối đa `field.max` ảnh. */
export function galleryValue(data: TemplateData, field: GalleryFieldDef): string[] {
  const raw = data[field.key];
  const slots = Array.isArray(raw) ? raw : [];
  return slots.slice(0, field.max).filter(Boolean);
}

/**
 * Điền dữ liệu mẫu (`default` của từng field) vào chỗ người dùng bỏ trống —
 * chỉ dành cho trang nhập thử (preview). Gallery điền theo từng slot.
 */
export function applyDefaults(meta: TemplateMeta, data: TemplateData): TemplateData {
  const out: TemplateData = {};
  for (const field of meta.fields) {
    const raw = data[field.key];
    if (field.type === "gallery") {
      const slots = Array.isArray(raw) ? raw : [];
      out[field.key] = Array.from(
        { length: field.max },
        (_, i) => slots[i] || field.default[i] || "",
      );
    } else {
      out[field.key] =
        typeof raw === "string" && raw.trim() !== "" ? raw : field.default;
    }
  }
  return out;
}
