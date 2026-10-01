"use client";

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
  OpeningSection,
  QuoteSection,
  ScheduleSection,
  StorySection,
  ThanksSection,
  VenueSection,
} from "../kit/sections";
import { WeddingShell } from "../kit/WeddingShell";
import { weddingTemplate5Meta as meta } from "./meta";

const m = MOTION.slide;

/**
 * Mẫu 5 — "Vườn Xanh Tối Giản": bìa ảnh tròn, ảnh oval trượt vào giữa, mosaic bất đối xứng,
 * slideshow mờ chéo, câu trích trên ảnh nền. Không có "cổng" mở — hợp thiệp gọn, đọc liền mạch.
 */
export default function WeddingTemplate5({ data, style }: TemplateProps) {
  const w = readWedding(data);

  return (
    <WeddingShell meta={meta} style={style} w={w}>
      <HeroCover
        variant="circle"
        photo={w.coverPhoto}
        groom={w.groom.name}
        bride={w.bride.name}
        kicker="Save the date"
        date={w.dateLabel}
        quote={w.coverQuote}
      />

      <OpeningSection w={w} m={m} />
      <CoupleSection w={w} m={m} frame="oval" connector="ampersand" title="Chúng mình" />
      <FamiliesSection w={w} m={m} band />
      <ScheduleSection w={w} m={m} />

      <GallerySection
        w={w}
        m={m}
        band
        layout="mosaicA"
        count={6}
        kicker="Khoảnh khắc"
        title="Từng ngày bên nhau"
      />

      <PhotoBackdrop src={w.backgroundPhoto} tone="dark" kenburns>
        <QuoteSection w={w} m={m} />
      </PhotoBackdrop>

      <CalendarSection w={w} m={m} countdown="light" />
      <StorySection w={w} m={m} band />

      <GallerySection
        w={w}
        m={m}
        layout="slideshow"
        frame="arch"
        kicker="Slideshow"
        title="Những khung hình đáng nhớ"
      />

      <VenueSection w={w} m={m} band />
      <GiftSection w={w} m={m} mode="cards" />
      <ThanksSection w={w} m={m} variant="frame" photoFrame="circle" />
    </WeddingShell>
  );
}
