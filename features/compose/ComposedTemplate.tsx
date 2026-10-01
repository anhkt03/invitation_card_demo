import type { ComponentType, ReactNode } from "react";
import FallingParticles from "@/components/shared/effects/FallingParticles";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import CalendarMonth from "@/components/shared/blocks/CalendarMonth";
import CountdownBoxes from "@/components/shared/blocks/CountdownBoxes";
import EventInfoBlock from "@/components/shared/blocks/EventInfoBlock";
import PortraitFrame from "@/components/shared/blocks/PortraitFrame";
import WishesBubbles from "@/components/shared/blocks/WishesBubbles";
import BalloonMotif from "@/components/shared/motifs/BalloonMotif";
import CakeMotif from "@/components/shared/motifs/CakeMotif";
import CloudBackdrop from "@/components/shared/motifs/CloudBackdrop";
import CornerFloral from "@/components/shared/motifs/CornerFloral";
import FireworkMotif from "@/components/shared/motifs/FireworkMotif";
import FrameBorder from "@/components/shared/motifs/FrameBorder";
import HeartMotif from "@/components/shared/motifs/HeartMotif";
import LanternMotif from "@/components/shared/motifs/LanternMotif";
import LaurelWreath from "@/components/shared/motifs/LaurelWreath";
import LotusMotif from "@/components/shared/motifs/LotusMotif";
import Monogram from "@/components/shared/motifs/Monogram";
import PartyHatMotif from "@/components/shared/motifs/PartyHatMotif";
import RibbonMotif from "@/components/shared/motifs/RibbonMotif";
import RingsMotif from "@/components/shared/motifs/RingsMotif";
import StarMotif from "@/components/shared/motifs/StarMotif";
import Countdown from "@/components/shared/sections/Countdown";
import EventDetails from "@/components/shared/sections/EventDetails";
import GiftQR from "@/components/shared/sections/GiftQR";
import HostsIntro from "@/components/shared/sections/HostsIntro";
import LegalFooter from "@/components/shared/sections/LegalFooter";
import MapSection from "@/components/shared/sections/MapSection";
import OpeningLetter from "@/components/shared/sections/OpeningLetter";
import PhotoGallery from "@/components/shared/sections/PhotoGallery";
import StoryTimeline from "@/components/shared/sections/StoryTimeline";
import ThankYouFooter from "@/components/shared/sections/ThankYouFooter";
import DatePill from "@/components/shared/primitives/DatePill";
import Divider, {
  type DividerVariant,
} from "@/components/shared/primitives/Divider";
import Kicker from "@/components/shared/primitives/Kicker";
import PoemLines from "@/components/shared/primitives/PoemLines";
import SectionHeading from "@/components/shared/primitives/SectionHeading";
import { buildStyleVars } from "@/components/templates/style-options";
import {
  fieldMap,
  galleryValue,
  textValue,
  type GalleryFieldDef,
  type TemplateMeta,
  type TemplateProps,
} from "@/components/templates/types";
import { COMPOSE_CONFIG } from "./config";
import type { MotifId, Recipe, SectionType } from "./recipe";

const DIVIDER_CYCLE: DividerVariant[] = [
  "line",
  "diamond",
  "dots",
  "leaf",
  "floral",
  "heart",
  "wave",
  "star",
];

function motifNode(id: MotifId, size: number): ReactNode {
  switch (id) {
    case "rings":
      return <RingsMotif size={size} />;
    case "heart":
      return <HeartMotif size={size} filled />;
    case "lotus":
      return <LotusMotif size={size} />;
    case "laurel":
      return <LaurelWreath size={size} />;
    case "star":
      return <StarMotif size={size} />;
    case "balloon":
      return <BalloonMotif size={size} />;
    case "cake":
      return <CakeMotif size={size} />;
    case "partyhat":
      return <PartyHatMotif size={size} />;
    case "firework":
      return <FireworkMotif size={size} />;
    case "lantern":
      return <LanternMotif size={size} />;
    case "ribbon":
      return <RibbonMotif size={size} />;
    case "cornerFloral":
      return <CornerFloral size={size} />;
    default:
      return null;
  }
}

function two(n: number) {
  return String(n).padStart(2, "0");
}
function dateLabelOf(d: Date | null): string {
  return d && !Number.isNaN(d.getTime())
    ? `${two(d.getDate())} · ${two(d.getMonth() + 1)} · ${d.getFullYear()}`
    : "";
}
function initialsOf(s: string): [string, string] {
  const w = s.trim().split(/\s+/).filter(Boolean);
  if (w.length === 0) return ["A", "B"];
  if (w.length === 1) return [w[0], w[0].slice(-1)];
  return [w[0], w[w.length - 1]];
}

export function createComposedTemplate(
  recipe: Recipe,
  meta: TemplateMeta,
): ComponentType<TemplateProps> {
  const cfg = COMPOSE_CONFIG[recipe.category];
  const fields = fieldMap(meta);
  const r = (role: string) => cfg.refs[role] ?? "";
  const galleryField = fields[r("gallery")] as GalleryFieldDef | undefined;

  function Composed({ data, style }: TemplateProps) {
    const t = (role: string) => textValue(data, fields[r(role)]);
    const titleText = t("title");
    const [monoL, monoR] = initialsOf(titleText);
    const date = t("date_time") ? new Date(t("date_time")) : null;
    const valid = date && !Number.isNaN(date.getTime()) ? date : null;
    const label = dateLabelOf(date);
    const gallery = galleryField ? galleryValue(data, galleryField) : [];
    const vars = buildStyleVars(meta, style);

    // ---- các cách hiển thị tên ----
    const plainThemedTitle = (
      <h1
        className="tpl-heading text-4xl leading-tight sm:text-5xl"
        style={{ color: "var(--tpl-primary)" }}
      >
        {titleText}
      </h1>
    );
    const whiteTitle = (
      <h1 className="tpl-heading text-4xl leading-tight text-white drop-shadow-md sm:text-5xl">
        {titleText}
      </h1>
    );

    // ---- render các section (có xáo trộn thứ tự) ----
    let rendered = 0;
    const items = recipe.sections
      .map((s, i) => {
        const node = renderSection(s);
        if (!node) return null;
        const motif = recipe.sectionMotifs[i];
        const showDivider = rendered > 0;
        const dv = recipe.dividerPerSection
          ? DIVIDER_CYCLE[rendered % DIVIDER_CYCLE.length]
          : recipe.divider;
        rendered += 1;
        return (
          <div key={i}>
            {showDivider && <Divider variant={dv} className="mb-11" />}
            {motif && motif !== "monogram" && (
              <div className="mb-4 flex justify-center">
                {motifNode(motif, 44)}
              </div>
            )}
            <RevealOnScroll>{node}</RevealOnScroll>
          </div>
        );
      })
      .filter(Boolean);

    return (
      <div
        className="tpl-body relative min-h-full"
        style={{
          ...vars,
          backgroundColor: "var(--tpl-bg)",
          color: "var(--tpl-text)",
        }}
      >
        <div className="mx-auto w-full max-w-[480px]">
          {renderCover()}
          <div className="space-y-11 py-11">
            {items}
            <Divider variant={recipe.divider} />
            <RevealOnScroll>
              <ThankYouFooter
                heading={cfg.thankHeading}
                message={t("thank_you")}
                signature={titleText}
              />
            </RevealOnScroll>
          </div>
          <LegalFooter muted />
        </div>
      </div>
    );

    // ==================== COVER ====================
    function renderCover() {
      switch (recipe.coverStyle) {
        case "photo":
          return (
            <div className="relative aspect-[3/4] max-h-[720px] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- ảnh nền tĩnh */}
              <img
                src={cfg.coverPhoto}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />
              {recipe.particles && <FallingParticles />}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-12 text-center">
                <p className="tpl-script text-2xl text-white drop-shadow-sm">
                  {cfg.kicker}
                </p>
                {whiteTitle}
                <p className="text-[13px] uppercase tracking-[0.3em] text-white/90">
                  {cfg.coverSubtitle}
                </p>
                {label && (
                  <p className="mt-1 rounded-full border border-white/70 px-5 py-1.5 text-sm tracking-widest text-white">
                    {label}
                  </p>
                )}
              </div>
            </div>
          );

        case "cloud":
          return (
            <CloudBackdrop className="px-8 py-16 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-white/90">
                {cfg.kicker}
              </p>
              <div className="mt-2">{whiteTitle}</div>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/85">
                {cfg.coverSubtitle}
              </p>
              {label && (
                <span className="mt-4 inline-block rounded-full border border-white/70 px-5 py-1.5 text-sm tracking-widest text-white">
                  {label}
                </span>
              )}
            </CloudBackdrop>
          );

        case "framed":
          return (
            <div
              className="relative px-6 py-14"
              style={{ backgroundColor: "var(--tpl-surface)" }}
            >
              {recipe.coverMotif && recipe.coverMotif !== "monogram" && (
                <div className="mb-4 flex justify-center">
                  {motifNode(recipe.coverMotif, 60)}
                </div>
              )}
              <FrameBorder variant="double" className="text-center">
                <Kicker>{cfg.kicker}</Kicker>
                <div className="my-3">{plainThemedTitle}</div>
                <p
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ color: "var(--tpl-muted)" }}
                >
                  {cfg.coverSubtitle}
                </p>
                {label && (
                  <div className="mt-4">
                    <DatePill>{label}</DatePill>
                  </div>
                )}
              </FrameBorder>
            </div>
          );

        case "monogram":
          return (
            <div
              className="px-8 py-16 text-center"
              style={{ backgroundColor: "var(--tpl-surface)" }}
            >
              <Monogram
                left={monoL}
                right={monoR}
                size={100}
                className="mx-auto"
              />
              <div className="mt-5">{plainThemedTitle}</div>
              <p
                className="mt-3 text-xs uppercase tracking-[0.3em]"
                style={{ color: "var(--tpl-muted)" }}
              >
                {cfg.coverSubtitle}
              </p>
              {label && (
                <div className="mt-4">
                  <DatePill>{label}</DatePill>
                </div>
              )}
            </div>
          );

        case "motif":
          return (
            <div className="relative px-8 py-16 text-center">
              {recipe.particles && (
                <FallingParticles
                  count={8}
                  color="color-mix(in srgb, var(--tpl-primary) 30%, transparent)"
                />
              )}
              <div className="mb-3 flex justify-center">
                {motifNode(
                  recipe.coverMotif && recipe.coverMotif !== "monogram"
                    ? recipe.coverMotif
                    : "star",
                  96,
                )}
              </div>
              <p
                className="tpl-script text-3xl"
                style={{ color: "var(--tpl-accent)" }}
              >
                {cfg.kicker}
              </p>
              <div className="mt-1">{plainThemedTitle}</div>
              <p
                className="mt-3 text-xs uppercase tracking-[0.3em]"
                style={{ color: "var(--tpl-muted)" }}
              >
                {cfg.coverSubtitle}
              </p>
              {label && (
                <div className="mt-4">
                  <DatePill>{label}</DatePill>
                </div>
              )}
            </div>
          );

        // center (mặc định)
        default:
          return (
            <div
              className="relative px-8 py-16 text-center"
              style={{ backgroundColor: "var(--tpl-surface)" }}
            >
              {recipe.particles && (
                <FallingParticles
                  count={7}
                  color="color-mix(in srgb, var(--tpl-primary) 30%, transparent)"
                />
              )}
              {recipe.coverMotif && recipe.coverMotif !== "monogram" && (
                <div className="mb-3 flex justify-center">
                  {motifNode(recipe.coverMotif, 64)}
                </div>
              )}
              <p
                className="tpl-script text-3xl"
                style={{ color: "var(--tpl-accent)" }}
              >
                {cfg.kicker}
              </p>
              <div className="mt-1">{plainThemedTitle}</div>
              <p
                className="mt-3 text-xs uppercase tracking-[0.3em]"
                style={{ color: "var(--tpl-muted)" }}
              >
                {cfg.coverSubtitle}
              </p>
              {label && (
                <div className="mt-4">
                  <DatePill>{label}</DatePill>
                </div>
              )}
            </div>
          );
      }
    }

    // ==================== SECTIONS ====================
    function renderSection(s: SectionType): ReactNode {
      switch (s) {
        case "letter":
          return (
            <OpeningLetter
              heading="Thư ngỏ"
              body={t("letter")}
              invitation={t("invitation")}
            />
          );
        case "poem":
          return (
            <div className="px-8">
              <PoemLines lines={t("letter")} />
            </div>
          );
        case "hosts":
          return (
            <HostsIntro
              hosts={[
                { label: r("host1L"), names: t("host1N") },
                { label: r("host2L"), names: t("host2N") },
              ]}
              headline={titleText}
            />
          );
        case "event":
          return recipe.eventAsBlock ? (
            <div className="px-6">
              <EventInfoBlock
                ceremonyName={t("ceremony_name")}
                date={date}
                timeLabel={
                  valid ? `Vào lúc ${two(valid.getHours())}:${two(valid.getMinutes())}` : undefined
                }
                note={t("note")}
                venueName={t("venue_name")}
                address={t("venue_address")}
              />
            </div>
          ) : (
            <EventDetails
              ceremonyName={t("ceremony_name")}
              date={date}
              note={t("note")}
              venueName={t("venue_name")}
              address={t("venue_address")}
            />
          );
        case "calendar":
          return (
            <div className="px-6 text-center">
              <SectionHeading className="mb-5">
                {t("ceremony_name")}
              </SectionHeading>
              <CalendarMonth
                date={date}
                variant={recipe.calendarDark ? "dark" : "light"}
              />
            </div>
          );
        case "countdown":
          if (recipe.countdownVariant === "bar")
            return <Countdown target={date} />;
          return (
            <div className="px-6">
              <CountdownBoxes
                target={date}
                variant={recipe.countdownVariant === "boxesDark" ? "dark" : "light"}
              />
            </div>
          );
        case "gallery":
          return gallery.length ? (
            <PhotoGallery heading="Khoảnh khắc" images={gallery} />
          ) : null;
        case "story":
          return t("story") ? (
            <StoryTimeline heading="Câu chuyện" milestones={t("story")} />
          ) : null;
        case "map":
          return (
            <MapSection venueName={t("venue_name")} address={t("venue_address")} />
          );
        case "gift":
          return t("qr_image") ? (
            <GiftQR heading="Hộp mừng" qrImage={t("qr_image")} note={t("qr_note")} />
          ) : null;
        case "wishes":
          return t("wishes") ? (
            <div className="px-6">
              <SectionHeading className="mb-4 text-center">
                Sổ lưu bút
              </SectionHeading>
              <WishesBubbles lines={t("wishes")} />
            </div>
          ) : null;
        case "portrait":
          return t("portrait") ? (
            <div className="px-6">
              <PortraitFrame src={t("portrait")} />
            </div>
          ) : null;
        case "ageBadge":
          return t("age") ? (
            <div className="px-6 text-center">
              <div
                className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4"
                style={{
                  borderColor: "var(--tpl-primary)",
                  backgroundColor: "var(--tpl-surface)",
                }}
              >
                <span
                  className="tpl-heading text-5xl font-bold leading-none"
                  style={{ color: "var(--tpl-primary)" }}
                >
                  {t("age")}
                </span>
              </div>
              <p
                className="mt-3 text-sm font-semibold uppercase tracking-[0.3em]"
                style={{ color: "var(--tpl-muted)" }}
              >
                Tròn {t("age")} tuổi
              </p>
            </div>
          ) : null;
        case "promo": {
          const lines = t("promo")
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter(Boolean);
          return lines.length ? (
            <section className="px-6">
              <div
                className="rounded-2xl border-2 border-dashed px-6 py-7 text-center"
                style={{
                  borderColor: "var(--tpl-accent)",
                  backgroundColor: "var(--tpl-surface)",
                }}
              >
                <SectionHeading className="mb-4">Ưu đãi</SectionHeading>
                <ul className="space-y-2">
                  {lines.map((line, i) => (
                    <li
                      key={i}
                      className="text-[length:calc(15px*var(--tpl-scale,1))] leading-7"
                      style={{ color: "var(--tpl-text)" }}
                    >
                      <span className="mr-2" style={{ color: "var(--tpl-accent)" }}>
                        ✦
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null;
        }
        case "hotline":
          return t("hotline") ? (
            <p
              className="px-6 text-center text-sm font-semibold tracking-wide"
              style={{ color: "var(--tpl-primary)" }}
            >
              ☎ Hotline: {t("hotline")}
            </p>
          ) : null;
        default:
          return null;
      }
    }
  }

  Composed.displayName = `Composed(${recipe.key})`;
  return Composed;
}
