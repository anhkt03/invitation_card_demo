"use client";

import EnvelopeLetter from "@/components/shared/interactive/EnvelopeLetter";
import HeroCover from "@/components/shared/layouts/HeroCover";
import PhotoBackdrop from "@/components/shared/layouts/PhotoBackdrop";
import type { TemplateProps } from "@/components/templates/types";
import { MOTION } from "../kit/motion";
import { readWedding } from "../kit/read";
import {
  CalendarSection,
  CoupleSection,
  FamiliesSection,
  GallerySection,
  GiftSection,
  LetterContent,
  OpeningSection,
  QuoteSection,
  ScheduleSection,
  StorySection,
  ThanksSection,
  VenueSection,
  WishesSection,
  hasLetter,
} from "../kit/sections";
import { Heading, Section } from "../kit/ui";
import { WeddingShell } from "../kit/WeddingShell";
import { weddingTemplate6Meta as meta } from "./meta";

const m = MOTION.dramatic;

/**
 * Mẫu 6 — "Dạ Tiệc Đêm": nền tối ánh vàng. Bìa ba dải ảnh, phong thư, ảnh tròn trượt vào giữa,
 * coverflow 3D và hai dải ảnh chạy ngược chiều.
 */
export default function WeddingTemplate6({ data, style }: TemplateProps) {
  const w = readWedding(data);

  return (
    <WeddingShell
      meta={meta}
      style={style}
      w={w}
      extraVars={{ ["--tpl-dark" as string]: "color-mix(in srgb, var(--tpl-bg) 60%, #000)" }}
    >
      <HeroCover
        variant="triptych"
        photo={w.coverPhoto}
        extras={w.gallery.slice(0, 2)}
        groom={w.groom.name}
        bride={w.bride.name}
        kicker="Save the date"
        date={w.dateLabel}
        particles
      />

      <OpeningSection w={w} m={m} />

      {hasLetter(w) && (
        <Section band className="items-center">
          <Heading kicker="Thiệp mời" title="Trân trọng kính mời" m={m} />
          <EnvelopeLetter sealLabel={w.seal} openOnView={w.autoScroll}>
            <LetterContent w={w} />
          </EnvelopeLetter>
        </Section>
      )}

      <CoupleSection w={w} m={m} frame="circle" connector="heart" />
      <FamiliesSection w={w} m={m} variant="edge" band />
      <ScheduleSection w={w} m={m} />

      {w.date && (
        <PhotoBackdrop src={w.backgroundPhoto} tone="dark">
          <CalendarSection w={w} m={m} countdown="dark" />
        </PhotoBackdrop>
      )}

      <GallerySection
        w={w}
        m={m}
        layout="coverflow"
        kicker="Gallery"
        title="Khoảnh khắc lấp lánh"
      />
      <GallerySection w={w} m={m} layout="duoRows" title="" />

      <PhotoBackdrop src={w.thanksPhoto} tone="dark" kenburns>
        <QuoteSection w={w} m={m} />
      </PhotoBackdrop>

      <StorySection w={w} m={m} band />
      <WishesSection w={w} m={m} />
      <VenueSection w={w} m={m} band />
      <GiftSection w={w} m={m} mode="box" openOnView={w.autoScroll} />
      <ThanksSection w={w} m={m} variant="fullbleed" />
    </WeddingShell>
  );
}
