"use client";

import FallingParticles from "@/components/shared/effects/FallingParticles";
import MailboxReveal from "@/components/shared/interactive/MailboxReveal";
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
  ScheduleSection,
  StorySection,
  ThanksSection,
  VenueSection,
  WishesSection,
  hasLetter,
} from "../kit/sections";
import { Heading, Section } from "../kit/ui";
import { WeddingShell } from "../kit/WeddingShell";
import { weddingTemplate3Meta as meta } from "./meta";

const m = MOTION.gentle;

/**
 * Mẫu 3 — "Hòm Thư Yêu Thương": bìa hai ảnh dán chéo, hòm thư bay thư mời, ảnh rải kiểu
 * scrapbook + bộ bài chạm để lật, hai ảnh trong khung băng dính trượt vào giữa.
 */
export default function WeddingTemplate3({ data, style }: TemplateProps) {
  const w = readWedding(data);

  return (
    <WeddingShell meta={meta} style={style} w={w} script="dancing">
      <div className="relative">
        <FallingParticles count={9} color="color-mix(in srgb, var(--tpl-primary) 35%, transparent)" />
        <HeroCover
          variant="stack"
          photo={w.coverPhoto}
          extras={w.gallery.slice(0, 2)}
          groom={w.groom.name}
          bride={w.bride.name}
          kicker="Save the date"
          date={w.dateLabel}
          quote={w.coverQuote}
        />
      </div>

      {hasLetter(w) && (
        <Section band className="items-center">
          <Heading kicker="Thư mời" title="Bạn có một lá thư" m={m} />
          <MailboxReveal sealLabel={w.seal} openOnView={w.autoScroll}>
            <LetterContent w={w} />
          </MailboxReveal>
        </Section>
      )}

      <OpeningSection w={w} m={m} />
      <CoupleSection w={w} m={m} frame="tape" connector="heart" />
      <FamiliesSection w={w} m={m} variant="edge" band />
      <ScheduleSection w={w} m={m} />

      <GallerySection
        w={w}
        m={m}
        layout="scatter"
        count={5}
        kicker="Scrapbook"
        title="Những mảnh ghép của chúng mình"
      />

      {w.date && (
        <PhotoBackdrop src={w.backgroundPhoto} tone="mono">
          <CalendarSection w={w} m={m} countdown="light" />
        </PhotoBackdrop>
      )}

      <GallerySection
        w={w}
        m={m}
        band
        layout="deck"
        from={5}
        kicker="Lật từng khoảnh khắc"
        title="Chạm để xem ảnh tiếp theo"
      />

      <StorySection w={w} m={m} />
      <WishesSection w={w} m={m} band />
      <VenueSection w={w} m={m} />
      <GiftSection w={w} m={m} band mode="box" openOnView={w.autoScroll} />
      <ThanksSection w={w} m={m} variant="background" />
    </WeddingShell>
  );
}
