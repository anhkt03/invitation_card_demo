import { buildComposedEntries } from "@/features/compose/generate";
import type { TemplateCategory, TemplateEntry } from "./types";
import { CATEGORY_ORDER } from "./types";
import BirthdayTemplate1 from "./birthday/BirthdayTemplate1";
import { birthdayTemplate1Meta } from "./birthday/BirthdayTemplate1/meta";
import GraduationTemplate1 from "./graduation/GraduationTemplate1";
import { graduationTemplate1Meta } from "./graduation/GraduationTemplate1/meta";
import GrandOpeningTemplate1 from "./grand-opening/GrandOpeningTemplate1";
import { grandOpeningTemplate1Meta } from "./grand-opening/GrandOpeningTemplate1/meta";
import WeddingDemo from "./wedding/Demo";
import { demoMeta } from "./wedding/Demo/meta";
import WeddingTemplate1 from "./wedding/WeddingTemplate1";
import { weddingTemplate1Meta } from "./wedding/WeddingTemplate1/meta";
import WeddingTemplate2 from "./wedding/WeddingTemplate2";
import { weddingTemplate2Meta } from "./wedding/WeddingTemplate2/meta";
import WeddingTemplate3 from "./wedding/WeddingTemplate3";
import { weddingTemplate3Meta } from "./wedding/WeddingTemplate3/meta";
import WeddingTemplate4 from "./wedding/WeddingTemplate4";
import { weddingTemplate4Meta } from "./wedding/WeddingTemplate4/meta";
import WeddingTemplate5 from "./wedding/WeddingTemplate5";
import { weddingTemplate5Meta } from "./wedding/WeddingTemplate5/meta";
import WeddingTemplate6 from "./wedding/WeddingTemplate6";
import { weddingTemplate6Meta } from "./wedding/WeddingTemplate6/meta";

/**
 * Registry ánh xạ component_key → template (FR-21). Trang danh sách, trang
 * nhập thử và trang thiệp [slug] đều tra template từ đây — thêm template mới
 * chỉ cần thêm một entry.
 */
// Template "gốc" viết tay + template ghép ngẫu nhiên (10/category) từ thư viện.
const BASE_ENTRIES: TemplateEntry[] = [
  { meta: weddingTemplate1Meta, Component: WeddingTemplate1 },
  { meta: weddingTemplate2Meta, Component: WeddingTemplate2 },
  { meta: weddingTemplate3Meta, Component: WeddingTemplate3 },
  { meta: weddingTemplate4Meta, Component: WeddingTemplate4 },
  { meta: weddingTemplate5Meta, Component: WeddingTemplate5 },
  { meta: weddingTemplate6Meta, Component: WeddingTemplate6 },
  { meta: demoMeta, Component: WeddingDemo },
  { meta: graduationTemplate1Meta, Component: GraduationTemplate1 },
  { meta: birthdayTemplate1Meta, Component: BirthdayTemplate1 },
  { meta: grandOpeningTemplate1Meta, Component: GrandOpeningTemplate1 },
];

export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> =
  Object.fromEntries(
    [...BASE_ENTRIES, ...buildComposedEntries()].map((e) => [e.meta.key, e]),
  );

export function getTemplate(key: string): TemplateEntry | null {
  return TEMPLATE_REGISTRY[key] ?? null;
}

/** Danh sách template theo thứ tự ưu tiên danh mục (wedding → graduation → birthday → grand-opening). */
export function listTemplates(category?: TemplateCategory): TemplateEntry[] {
  const all = Object.values(TEMPLATE_REGISTRY).sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.meta.category) -
      CATEGORY_ORDER.indexOf(b.meta.category),
  );
  return category ? all.filter((t) => t.meta.category === category) : all;
}
