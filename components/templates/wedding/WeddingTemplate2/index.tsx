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
  hasLetter,
} from "../kit/sections";
import { Heading, Section } from "../kit/ui";
import { WeddingShell } from "../kit/WeddingShell";
import { weddingTemplate2Meta as meta } from "./meta";

const m = MOTION.soft;

/**
 * Mẫu 2 — "Thư Mời Hạnh Phúc": bìa ảnh mờ dần xuống nền, phong thư mở bằng con dấu sáp,
 * hai ảnh trượt vào giữa, lịch trên ảnh đen trắng, album vuốt ngang, hộp quà mở nắp.
 */
export default function WeddingTemplate2({ data, style }: TemplateProps) {
  const w = readWedding(data);

  return (
    <WeddingShell meta={meta} style={style} w={w}>
      <HeroCover
        variant="fade"
        photo={w.coverPhoto}
        groom={w.groom.name}
        bride={w.bride.name}
        kicker="Save the date"
        date={w.dateLabel}
        quote={w.coverQuote}
      />

      <OpeningSection w={w} m={m} />

      {hasLetter(w) && (
        <Section band className="items-center">
          <Heading kicker="Thiệp mời" title="Một lá thư dành cho bạn" m={m} />
          <EnvelopeLetter sealLabel={w.seal} openOnView={w.autoScroll}>
            <LetterContent w={w} />
          </EnvelopeLetter>
        </Section>
      )}

      <CoupleSection w={w} m={m} frame="arch" />
      <FamiliesSection w={w} m={m} band />
      <ScheduleSection w={w} m={m} />

      {w.date && (
        <PhotoBackdrop src={w.backgroundPhoto} tone="mono">
          <CalendarSection w={w} m={m} countdown="light" />
        </PhotoBackdrop>
      )}

      <GallerySection w={w} m={m} layout="carousel" frame="rounded" />

      <PhotoBackdrop src={w.backgroundPhoto} tone="dark" kenburns>
        <QuoteSection w={w} m={m} />
      </PhotoBackdrop>

      <StorySection w={w} m={m} />
      <VenueSection w={w} m={m} band />
      <GiftSection w={w} m={m} mode="box" openOnView={w.autoScroll} />
      <ThanksSection w={w} m={m} variant="frame" photoFrame="arch" />
    </WeddingShell>
  );
}
