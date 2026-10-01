"use client";

import { create } from "zustand";
import type {
  TemplateData,
  TemplateStyleConfig,
} from "@/components/templates/types";

type PreviewStore = {
  templateKey: string | null;
  data: TemplateData;
  style: TemplateStyleConfig;
  /** true sau khi bấm "Lưu & Xem trước" — chuyển sang chế độ xem toàn thiệp. */
  saved: boolean;
  init: (templateKey: string, defaultStyle: TemplateStyleConfig) => void;
  setField: (key: string, value: string | string[]) => void;
  setStyle: (patch: Partial<TemplateStyleConfig>) => void;
  setSaved: (saved: boolean) => void;
};

// Store chỉ sống trong bộ nhớ của phiên đang mở — tuyệt đối không dùng
// persist/localStorage/cookie cho dữ liệu nhập thử (FR-14, NFR-10).
export const usePreviewStore = create<PreviewStore>((set, get) => ({
  templateKey: null,
  data: {},
  style: { palette: 0, heading_font: "" },
  saved: false,

  init: (templateKey, defaultStyle) => {
    if (get().templateKey === templateKey) return;
    set({ templateKey, data: {}, style: defaultStyle, saved: false });
  },

  setField: (key, value) =>
    set((s) => ({ data: { ...s.data, [key]: value } })),

  setStyle: (patch) => set((s) => ({ style: { ...s.style, ...patch } })),

  setSaved: (saved) => set({ saved }),
}));

/** Đã nhập gì đó chưa — dùng cho cảnh báo rời trang (FR-16). */
export function isDirty(data: TemplateData): boolean {
  return Object.values(data).some((v) =>
    Array.isArray(v) ? v.some(Boolean) : v !== "",
  );
}
