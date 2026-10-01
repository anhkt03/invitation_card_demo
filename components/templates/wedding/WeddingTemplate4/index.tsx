"use client";

import { useState } from "react";
import KenBurns from "@/components/shared/effects/KenBurns";
import { revealProps } from "@/components/shared/effects/reveal";
import CurtainCover from "@/components/shared/interactive/CurtainCover";
import type { TemplateProps } from "@/components/templates/types";
import { MOTION } from "../kit/motion";
import { readWedding, type WeddingView } from "../kit/read";
import {
  CalendarSection,
  CoupleSection,
  FamiliesSection,
  GallerySection,
  GiftSection,
  OpeningSection,
  ScheduleSection,
  StorySection,
  ThanksSection,
  VenueSection,
} from "../kit/sections";
import { WeddingShell } from "../kit/WeddingShell";
import { weddingTemplate4Meta as meta } from "./meta";

const m = MOTION.dramatic;
const GOLD = "color-mix(in srgb, var(--tpl-accent) 55%, #fff)";

/** Sân khấu phía sau rèm: ảnh bìa tối + tên, nội dung hiện lần lượt sau khi rèm mở. */
function Stage({ w, open }: { w: WeddingView; open: boolean }) {
  const r = (v: Parameters<typeof revealProps>[0], delay: number) =>
    revealProps(v, open, { delay, duration: 1200 });
  const kicker = r("fade", 1100);
  const names = r("blur", 1500);
  const date = r("up", 2000);
  const quote = r("fade", 2400);

  return (
    <div className="relative h-full w-full overflow-hidden text-center text-white">
      <KenBurns src={w.coverPhoto} focus="50% 30%" className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/75" />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 px-[17%]">
        <p
          {...kicker}
          className={`${kicker.className} text-[11px] uppercase tracking-[0.45em]`}
          style={{ ...kicker.style, color: GOLD }}
        >
          Thiệp mời cưới
        </p>
        {w.names && (
          <h1
            {...names}
            className={`${names.className} tpl-script flex flex-col items-center text-[12cqw] leading-[1.04] drop-shadow-lg`}
            style={{ ...names.style, color: GOLD }}
          >
            <span>{w.groom.name}</span>
            {w.groom.name && w.bride.name && (
              <span className="tpl-heading text-[6cqw] italic leading-none text-white/90">&amp;</span>
            )}
            <span>{w.bride.name}</span>
          </h1>
        )}
        {w.dateLabel && (
          <p
            {...date}
            className={`${date.className} rounded-full border px-5 py-1.5 text-sm tracking-[0.3em]`}
            style={{ ...date.style, borderColor: GOLD, color: GOLD }}
          >
            {w.dateLabel}
          </p>
        )}
        {w.coverQuote && (
          <p {...quote} className={`${quote.className} tpl-heading max-w-[280px] text-base italic text-white/90`}>
            “{w.coverQuote}”
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Mẫu 4 — "Song Hỷ Rèm Đỏ": rèm nhung mở ra sân khấu, khung ảnh viền cổ điển,
 * tam liên + dải ảnh tràn lề. Tự cuộn chỉ bắt đầu sau khi rèm đã mở.
 */
export default function WeddingTemplate4({ data, style }: TemplateProps) {
  const w = readWedding(data);
  const [curtainOpen, setCurtainOpen] = useState(false);

  return (
    <WeddingShell meta={meta} style={style} w={w} autoScrollReady={curtainOpen}>
      <CurtainCover openOnView={false} onOpenChange={setCurtainOpen}>
        {(open) => <Stage w={w} open={open} />}
      </CurtainCover>

      <OpeningSection w={w} m={m} />
      <CoupleSection w={w} m={m} frame="ornate" connector="ampersand" title="Song hỷ" />
      <FamiliesSection w={w} m={m} band />
      <ScheduleSection w={w} m={m} />

      <GallerySection
        w={w}
        m={m}
        band
        layout="triptych"
        count={6}
        kicker="Album cưới"
        title="Khoảnh khắc đáng nhớ"
      />
      <GallerySection w={w} m={m} layout="banner" from={2} count={3} title="" />

      <CalendarSection w={w} m={m} band countdown="dark" />
      <StorySection w={w} m={m} />
      <VenueSection w={w} m={m} band />
      <GiftSection w={w} m={m} mode="box" />
      <ThanksSection w={w} m={m} variant="fullbleed" />
    </WeddingShell>
  );
}
