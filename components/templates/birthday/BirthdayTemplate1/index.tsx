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
import ThankYouFooter from "@/components/shared/sections/ThankYouFooter";
import {
  fieldMap,
  galleryValue,
  textValue,
  type GalleryFieldDef,
  type TemplateProps,
} from "@/components/templates/types";
import { birthdayTemplate1Meta as meta } from "./meta";

export default function BirthdayTemplate1({ data, style }: TemplateProps) {
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
  const age = t("age").trim();

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
          kicker="Happy birthday"
          title={t("celebrant_name")}
          subtitle="Mời bạn đến chung vui tiệc sinh nhật"
          dateLabel={dateLabel}
        />

        <div className="relative z-10 -mt-8 space-y-12 pb-10">
          {/* Khối tuổi nổi bật */}
          {age && (
            <RevealOnScroll>
              <div className="px-6 text-center">
                <div
                  className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 shadow-sm"
                  style={{
                    borderColor: "var(--tpl-primary)",
                    backgroundColor: "var(--tpl-surface)",
                  }}
                >
                  <span
                    className="tpl-heading text-5xl font-bold leading-none"
                    style={{ color: "var(--tpl-primary)" }}
                  >
                    {age}
                  </span>
                </div>
                <p
                  className="mt-3 text-sm font-semibold uppercase tracking-[0.3em]"
                  style={{ color: "var(--tpl-muted)" }}
                >
                  Tròn {age} tuổi
                </p>
              </div>
            </RevealOnScroll>
          )}

          <RevealOnScroll>
            <OpeningLetter
              heading="Bạn ơi!"
              body={t("opening_letter")}
              invitation={t("invitation")}
            />
          </RevealOnScroll>

          <SectionDivider />

          <RevealOnScroll>
            <EventDetails
              ceremonyName={t("party_name")}
              date={date}
              note={t("dress_code")}
              venueName={t("venue_name")}
              address={t("venue_address")}
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <Countdown target={date} passedLabel="Tiệc đã bắt đầu rồi!" />
          </RevealOnScroll>

          <SectionDivider />

          <RevealOnScroll>
            <PhotoGallery heading="Cùng ngắm nào" images={gallery} />
          </RevealOnScroll>

          <RevealOnScroll>
            <MapSection
              heading="Tới bữa tiệc thế nào?"
              venueName={t("venue_name")}
              address={t("venue_address")}
            />
          </RevealOnScroll>

          <div className="relative">
            <FallingParticles
              count={10}
              color="color-mix(in srgb, var(--tpl-primary) 45%, transparent)"
            />
            <FallingParticles
              count={8}
              color="color-mix(in srgb, var(--tpl-accent) 45%, transparent)"
            />
            <RevealOnScroll>
              <ThankYouFooter
                heading="Hẹn gặp bạn!"
                message={t("thank_you")}
                signature={t("celebrant_name")}
              />
            </RevealOnScroll>
          </div>
        </div>

        <LegalFooter muted />
      </div>
    </div>
  );
}
