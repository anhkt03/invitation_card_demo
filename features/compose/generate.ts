import type { DividerVariant } from "@/components/shared/primitives/Divider";
import {
  BODY_FONT_OPTIONS,
  HEADING_FONT_OPTIONS,
  type ScaleId,
} from "@/components/templates/style-options";
import type {
  TemplateEntry,
  TemplateMeta,
} from "@/components/templates/types";
import { createComposedTemplate } from "./ComposedTemplate";
import { COMPOSE_CONFIG, type ComposeConfig } from "./config";
import type {
  ComposeCategory,
  CountdownVariant,
  MotifId,
  NamesLayout,
  Recipe,
  SectionType,
} from "./recipe";
import { chance, mulberry32, pick, shuffle, type Rng } from "./rng";
import { thumbFor } from "./thumbnails";

const DIVIDERS: DividerVariant[] = [
  "line",
  "diamond",
  "dots",
  "leaf",
  "floral",
  "heart",
  "wave",
  "star",
];
const SCALES: ScaleId[] = ["sm", "md", "lg"];
const NAMES_LAYOUTS: NamesLayout[] = ["inline", "stacked", "monogram"];
const COUNTDOWN_VARIANTS: CountdownVariant[] = [
  "bar",
  "boxesLight",
  "boxesDark",
];

const PREFIX: Record<ComposeCategory, string> = {
  graduation: "Graduation",
  birthday: "Birthday",
  "grand-opening": "GrandOpening",
};
const SEED_BASE: Record<ComposeCategory, number> = {
  graduation: 2000,
  birthday: 3000,
  "grand-opening": 4000,
};

/**
 * Chọn tập section rồi XÁO TRỘN thứ tự — mỗi mẫu một bố cục khác nhau.
 * Chỉ ghim phần giới thiệu (hosts/ageBadge) lên đầu để vẫn hợp lý.
 */
function buildSections(cfg: ComposeConfig, rng: Rng): SectionType[] {
  const pool = new Set(cfg.sectionPool);
  const has = (s: SectionType) => pool.has(s);
  const chosen: SectionType[] = [];

  if (has("poem") && has("letter"))
    chosen.push(chance(rng, 0.5) ? "letter" : "poem");
  else if (has("letter")) chosen.push("letter");
  else if (has("poem")) chosen.push("poem");

  if (has("hosts")) chosen.push("hosts");
  if (has("ageBadge")) chosen.push("ageBadge");
  if (has("portrait") && chance(rng, 0.6)) chosen.push("portrait");

  // event / calendar: có thể chọn 1 hoặc cả 2
  if (has("event") && has("calendar")) {
    const p = pick(rng, ["event", "calendar", "both"] as const);
    if (p === "both") chosen.push("event", "calendar");
    else chosen.push(p);
  } else if (has("event")) chosen.push("event");
  else if (has("calendar")) chosen.push("calendar");

  if (has("countdown") && chance(rng, 0.72)) chosen.push("countdown");
  if (has("story") && chance(rng, 0.6)) chosen.push("story");
  if (has("promo")) chosen.push("promo");
  if (has("gallery") && chance(rng, 0.7)) chosen.push("gallery");
  if (has("wishes") && chance(rng, 0.65)) chosen.push("wishes");
  if (has("map") && chance(rng, 0.5)) chosen.push("map");
  if (has("gift") && chance(rng, 0.5)) chosen.push("gift");
  if (has("hotline")) chosen.push("hotline");

  // Ghim giới thiệu lên đầu, xáo trộn phần còn lại.
  const pinned = chosen.filter((s) => s === "hosts" || s === "ageBadge");
  const rest = shuffle(
    rng,
    chosen.filter((s) => s !== "hosts" && s !== "ageBadge"),
  );
  return [...pinned, ...rest];
}

function generateRecipe(
  category: ComposeCategory,
  n: number,
): { recipe: Recipe; paletteIndex: number } {
  const cfg = COMPOSE_CONFIG[category];
  const rng = mulberry32(SEED_BASE[category] + n);

  const paletteIndex = Math.floor(rng() * cfg.palettes.length);
  const palette = cfg.palettes[paletteIndex];
  const sections = buildSections(cfg, rng);
  const sectionMotifs: (MotifId | null)[] = sections.map(() =>
    chance(rng, 0.3) ? pick(rng, cfg.motifs) : null,
  );

  const recipe: Recipe = {
    key: `${PREFIX[category]}C${n}`,
    name: `${cfg.categoryLabel} ${n}`,
    category,
    palette,
    headingFont: pick(rng, HEADING_FONT_OPTIONS).id,
    bodyFont: pick(rng, BODY_FONT_OPTIONS).id,
    scale: pick(rng, SCALES),
    coverStyle: pick(rng, cfg.coverStyles),
    namesLayout: pick(rng, NAMES_LAYOUTS),
    coverMotif: chance(rng, 0.65) ? pick(rng, cfg.motifs) : null,
    particles: chance(rng, 0.5),
    countdownVariant: pick(rng, COUNTDOWN_VARIANTS),
    calendarDark: chance(rng, 0.35),
    eventAsBlock: chance(rng, 0.5),
    sections,
    sectionMotifs,
    dividerPerSection: chance(rng, 0.5),
    divider: pick(rng, DIVIDERS),
  };
  return { recipe, paletteIndex };
}

function metaFor(
  cfg: ComposeConfig,
  recipe: Recipe,
  paletteIndex: number,
  seed: number,
): TemplateMeta {
  return {
    key: recipe.key,
    name: recipe.name,
    category: recipe.category,
    description: `${cfg.categoryLabel} — phối ${recipe.sections.length + 1} khối, tông ${recipe.palette.name}.`,
    thumbnail: thumbFor(recipe.key, recipe.category, seed),
    fields: cfg.fields,
    palettes: cfg.palettes,
    fonts: HEADING_FONT_OPTIONS,
    defaultStyle: {
      palette: paletteIndex,
      heading_font: recipe.headingFont,
      body_font: recipe.bodyFont,
      scale: recipe.scale,
    },
  };
}

/** Sinh toàn bộ template ghép: 10 mẫu cho mỗi category. */
export function buildComposedEntries(perCategory = 10): TemplateEntry[] {
  const entries: TemplateEntry[] = [];
  (Object.keys(COMPOSE_CONFIG) as ComposeCategory[]).forEach((category) => {
    const cfg = COMPOSE_CONFIG[category];
    for (let n = 1; n <= perCategory; n++) {
      const { recipe, paletteIndex } = generateRecipe(category, n);
      const seed = SEED_BASE[category] + n;
      const meta = metaFor(cfg, recipe, paletteIndex, seed);
      entries.push({ meta, Component: createComposedTemplate(recipe, meta) });
    }
  });
  return entries;
}
