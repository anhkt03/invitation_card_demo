"use client";

import type { CSSProperties, ReactNode } from "react";
import AutoScroll from "@/components/shared/interactive/AutoScroll";
import LegalFooter from "@/components/shared/sections/LegalFooter";
import { buildStyleVars } from "@/components/templates/style-options";
import type { TemplateMeta, TemplateStyleConfig } from "@/components/templates/types";
import type { WeddingView } from "./read";

type Props = {
  meta: TemplateMeta;
  style: TemplateStyleConfig;
  w: WeddingView;
  /** Font chữ viết tay của template (mặc định Great Vibes). */
  script?: "great-vibes" | "dancing";
  /** Biến CSS riêng của template (vd --tpl-dark). */
  extraVars?: CSSProperties;
  /** Bìa (rèm/phong thư) đã mở chưa — chỉ khi đó auto-scroll mới tự chạy. Mặc định true. */
  autoScrollReady?: boolean;
  children: ReactNode;
};

/**
 * Vỏ chung của các mẫu thiệp cưới: áp biến style (--tpl-*), khung cột điện thoại,
 * nút tự động cuộn (khi dữ liệu bật `auto_scroll`) và footer pháp lý (FR-73).
 * `overflow-x: clip` chặn việc animation trượt ngang làm trang bị tràn — khác với
 * `overflow: hidden`, nó không tạo khung cuộn nên nút sticky vẫn hoạt động.
 */
export function WeddingShell({
  meta,
  style,
  w,
  script = "great-vibes",
  extraVars,
  autoScrollReady = true,
  children,
}: Props) {
  const vars = {
    ...buildStyleVars(meta, style),
    "--tpl-font-script": `var(--font-${script})`,
    "--tpl-dark": "color-mix(in srgb, var(--tpl-primary) 68%, #000)",
    ...extraVars,
  } as CSSProperties;

  return (
    <div
      className="tpl-body relative min-h-full overflow-x-clip"
      style={{ ...vars, backgroundColor: "var(--tpl-bg)", color: "var(--tpl-text)" }}
    >
      <div className="@container mx-auto w-full max-w-[430px]">
        {children}
        <AutoScroll enabled={w.autoScroll} speed={w.autoScrollSpeed} ready={autoScrollReady} />
        <LegalFooter muted />
      </div>
    </div>
  );
}
