"use client";

import { buildStyleVars } from "@/components/templates/style-options";
import FallingParticles from "@/components/shared/effects/FallingParticles";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import SectionDivider from "@/components/shared/effects/SectionDivider";
import Countdown from "@/components/shared/sections/Countdown";
import CoverHero from "@/components/shared/sections/CoverHero";
import EventDetails from "@/components/shared/sections/EventDetails";
import GiftQR from "@/components/shared/sections/GiftQR";
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
import { weddingTemplate1Meta as meta } from "./meta";

export default function WeddingTemplate1({ data, style }: TemplateProps) {
  const fields = fieldMap(meta);
  const t = (key: string) => textValue(data, fields[key]);

  const groomName = t("groom_name");
  const brideName = t("bride_name");
  const coupleNames = `${groomName} & ${brideName}`;
  const date = t("date_time") ? new Date(t("date_time")) : null;
  const dateLabel =
    date && !Number.isNaN(date.getTime())
      ? `${String(date.getDate()).padStart(2, "0")} · ${String(
          date.getMonth() + 1,
        ).padStart(2, "0")} · ${date.getFullYear()}`
      : "";
  const gallery = galleryValue(data, fields.gallery as GalleryFieldDef);
  const qrImage = t("qr_image");

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
          kicker="Save the date"
          title={coupleNames}
          subtitle="Trân trọng báo tin lễ thành hôn"
          dateLabel={dateLabel}
        />

        <div className="relative z-10 -mt-8 space-y-12 pb-10">
          <RevealOnScroll>
            <OpeningLetter
              heading="Thư ngỏ"
              body={t("opening_letter")}
              invitation={t("invitation")}
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <HostsIntro
              hosts={[
                { label: "Nhà trai", names: t("groom_parents") },
                { label: "Nhà gái", names: t("bride_parents") },
              ]}
              headline={coupleNames}
            />
          </RevealOnScroll>

          <SectionDivider />

          <RevealOnScroll>
            <EventDetails
              ceremonyName={t("ceremony_name")}
              date={date}
              note={t("lunar_date")}
              venueName={t("venue_name")}
              address={t("venue_address")}
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <Countdown target={date} passedLabel="Hạnh phúc đã bắt đầu!" />
          </RevealOnScroll>

          <SectionDivider />

          <RevealOnScroll>
            <PhotoGallery heading="Khoảnh khắc" images={gallery} />
          </RevealOnScroll>

          {t("story_milestones") && (
            <RevealOnScroll>
              <StoryTimeline
                heading="Chuyện chúng mình"
                milestones={t("story_milestones")}
              />
            </RevealOnScroll>
          )}

          <SectionDivider />

          <RevealOnScroll>
            <MapSection
              heading="Bản đồ chỉ đường"
              venueName={t("venue_name")}
              address={t("venue_address")}
            />
          </RevealOnScroll>

          {qrImage && (
            <RevealOnScroll>
              <GiftQR
                heading="Mừng cưới"
                qrImage={qrImage}
                note={t("qr_note")}
              />
            </RevealOnScroll>
          )}

          <div className="relative">
            <FallingParticles
              count={8}
              color="color-mix(in srgb, var(--tpl-primary) 35%, transparent)"
            />
            <RevealOnScroll>
              <ThankYouFooter
                heading="Trân trọng cảm ơn!"
                message={t("thank_you")}
                signature={coupleNames}
              />
            </RevealOnScroll>
          </div>
        </div>

        <LegalFooter muted />
      </div>
    </div>
  );
}
