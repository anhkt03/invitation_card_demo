import {
  DEFAULT_BODY_FONT,
  DEFAULT_SCALE,
  HEADING_FONT_OPTIONS,
} from "@/components/templates/style-options";
import type { TemplateMeta, TemplatePalette } from "@/components/templates/types";
import { WEDDING_FIELDS } from "./fields";

type Options = Pick<TemplateMeta, "key" | "name" | "description" | "thumbnail"> & {
  palettes: TemplatePalette[];
  /** id phông chữ tiêu đề mặc định (trong HEADING_FONT_OPTIONS). */
  headingFont: string;
  bodyFont?: string;
};

/**
 * Meta của một mẫu thiệp cưới dựng từ kit: dùng chung bộ field (WEDDING_FIELDS)
 * nên chỉ khai báo phần riêng — tên, mô tả, palette, font mặc định.
 */
export function makeWeddingMeta({
  palettes,
  headingFont,
  bodyFont = DEFAULT_BODY_FONT,
  ...rest
}: Options): TemplateMeta {
  return {
    ...rest,
    category: "wedding",
    fields: WEDDING_FIELDS,
    palettes,
    fonts: HEADING_FONT_OPTIONS,
    defaultStyle: {
      palette: 0,
      heading_font: headingFont,
      body_font: bodyFont,
      scale: DEFAULT_SCALE,
    },
  };
}
