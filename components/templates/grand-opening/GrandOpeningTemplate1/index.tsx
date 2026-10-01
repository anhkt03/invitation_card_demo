"use client";

import { buildStyleVars } from "@/components/templates/style-options";
import FallingParticles from "@/components/shared/effects/FallingParticles";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import SectionDivider from "@/components/shared/effects/SectionDivider";
import Countdown from "@/components/shared/sections/Countdown";
import CoverHero from "@/components/shared/sections/CoverHero";
import EventDetails from "@/components/shared/sections/EventDetails";
import LegalFooter from "@/components/shared/sections/LegalFooter";
import MapSection from "@/components/shared/sections/MapSection";
import OpeningLetter from "@/components/shared/sections/OpeningLetter";
import PhotoGallery from "@/components/shared/sections/PhotoGallery";
import StoryTimeline from "@/components/shared/sections/StoryTimeline";
import ThankYouFooter from "@/components/shared/sections/ThankYouFooter";
import {
  fieldMap,
  galleryValue,
  textValue,
  type GalleryFieldDef,
  type TemplateProps,
} from "@/components/templates/types";
import { grandOpeningTemplate1Meta as meta } from "./meta";

export default function GrandOpeningTemplate1({ data, style }: TemplateProps) {
  const fields = fieldMap(meta);
  const t = (key: string) => textValue(data, fields[key]);

  const date = t("date_time") ? new Date(t("date_time")) : null;
  const dateLabel =
    date && !Number.isNaN(date.getTime())
      ? `${String(date.getDate()).padStart(2, "0")} · ${String(
          date.getMonth() + 1,
        ).padStart(2, "0")} · ${date.getFullYear()}`
      : "";
  const gallery = galleryValue(data, fields.gallery as GalleryFieldDef);
  const promoLines = t("promo")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const hotline = t("hotline").trim();

  const vars = buildStyleVars(meta, style);

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
        <CoverHero
          photo={t("cover_photo")}
          kicker="Grand opening"
          title={t("brand_name")}
          subtitle="Trân trọng kính mời tới dự lễ khai trương"
          dateLabel={dateLabel}
          particles={false}
        />

        <div className="relative z-10 -mt-8 space-y-12 pb-10">
          {/* Slogan thương hiệu */}
          {t("tagline") && (
            <RevealOnScroll>
              <p
                className="tpl-heading px-10 text-center text-xl italic leading-8"
                style={{ color: "var(--tpl-accent)" }}
              >
                “{t("tagline")}”
              </p>
            </RevealOnScroll>
          )}

          <RevealOnScroll>
            <OpeningLetter
              heading="Thư ngỏ"
              body={t("opening_letter")}
              invitation={t("invitation")}
            />
          </RevealOnScroll>

          <SectionDivider />

          <RevealOnScroll>
            <EventDetails
              ceremonyName={t("event_name")}
              date={date}
              note={t("event_note")}
              venueName={t("venue_name")}
              address={t("venue_address")}
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <Countdown target={date} passedLabel="Chúng tôi đã khai trương!" />
          </RevealOnScroll>

          <SectionDivider />

          {t("program") && (
            <RevealOnScroll>
              <StoryTimeline
                heading="Chương trình buổi lễ"
                milestones={t("program")}
              />
            </RevealOnScroll>
          )}

          {/* Ưu đãi khai trương */}
          {promoLines.length > 0 && (
            <RevealOnScroll>
              <section className="px-6">
                <div
                  className="rounded-2xl border-2 border-dashed px-6 py-7 text-center"
                  style={{
                    borderColor: "var(--tpl-accent)",
                    backgroundColor: "var(--tpl-surface)",
                  }}
                >
                  <h2
                    className="tpl-script mb-4 text-3xl"
                    style={{ color: "var(--tpl-primary)" }}
                  >
                    Ưu đãi khai trương
                  </h2>
                  <ul className="space-y-2">
                    {promoLines.map((line, i) => (
                      <li
                        key={i}
                        className="text-[15px] leading-7"
                        style={{ color: "var(--tpl-text)" }}
                      >
                        <span
                          aria-hidden
                          className="mr-2"
                          style={{ color: "var(--tpl-accent)" }}
                        >
                          ✦
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </RevealOnScroll>
          )}

          <RevealOnScroll>
            <PhotoGallery heading="Không gian" images={gallery} />
          </RevealOnScroll>

          <SectionDivider />

          <RevealOnScroll>
            <MapSection
              heading="Bản đồ chỉ đường"
              venueName={t("venue_name")}
              address={t("venue_address")}
            />
          </RevealOnScroll>

          <div className="relative">
            <FallingParticles
              count={9}
              color="color-mix(in srgb, var(--tpl-accent) 50%, transparent)"
            />
            <RevealOnScroll>
              <ThankYouFooter
                heading="Trân trọng!"
                message={t("thank_you")}
                signature={t("brand_name")}
              />
              {hotline && (
                <p
                  className="mt-4 text-center text-sm font-semibold tracking-wide"
                  style={{ color: "var(--tpl-primary)" }}
                >
                  ☎ Hotline: {hotline}
                </p>
              )}
            </RevealOnScroll>
          </div>
        </div>

        <LegalFooter muted />
      </div>
    </div>
  );
}
