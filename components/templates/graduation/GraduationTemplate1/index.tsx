"use client";

import { buildStyleVars } from "@/components/templates/style-options";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import SectionDivider from "@/components/shared/effects/SectionDivider";
import Countdown from "@/components/shared/sections/Countdown";
import CoverHero from "@/components/shared/sections/CoverHero";
import EventDetails from "@/components/shared/sections/EventDetails";
import HostsIntro from "@/components/shared/sections/HostsIntro";
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
import { graduationTemplate1Meta as meta } from "./meta";

export default function GraduationTemplate1({ data, style }: TemplateProps) {
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
          kicker="Graduation day"
          title={t("graduate_name")}
          subtitle="Trân trọng kính mời tới dự lễ tốt nghiệp"
          dateLabel={dateLabel}
          particles={false}
        />

        <div className="relative z-10 -mt-8 space-y-12 pb-10">
          <RevealOnScroll>
            <OpeningLetter
              heading="Thư mời"
              body={t("opening_letter")}
              invitation={t("invitation")}
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <HostsIntro
              hosts={[
                {
                  label: "Tân khoa",
                  names: `${t("degree")}\n${t("school")}`,
                },
              ]}
              headline={t("graduate_name")}
            />
          </RevealOnScroll>

          <SectionDivider />

          <RevealOnScroll>
            <EventDetails
              ceremonyName={t("ceremony_name")}
              date={date}
              note={t("event_note")}
              venueName={t("venue_name")}
              address={t("venue_address")}
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <Countdown target={date} passedLabel="Đã chính thức tốt nghiệp!" />
          </RevealOnScroll>

          <SectionDivider />

          {t("journey") && (
            <RevealOnScroll>
              <StoryTimeline heading="Hành trình" milestones={t("journey")} />
            </RevealOnScroll>
          )}

          <RevealOnScroll>
            <PhotoGallery heading="Kỷ niệm" images={gallery} />
          </RevealOnScroll>

          <SectionDivider />

          <RevealOnScroll>
            <MapSection
              heading="Đường tới hội trường"
              venueName={t("venue_name")}
              address={t("venue_address")}
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <ThankYouFooter
              heading="Hẹn gặp bạn!"
              message={t("thank_you")}
              signature={t("graduate_name")}
            />
          </RevealOnScroll>
        </div>

        <LegalFooter muted />
      </div>
    </div>
  );
}
