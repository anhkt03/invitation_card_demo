"use client";

import type { CSSProperties } from "react";
import ArchPhoto from "@/components/shared/blocks/ArchPhoto";
import CalendarMonth from "@/components/shared/blocks/CalendarMonth";
import EnvelopeReveal from "@/components/shared/blocks/EnvelopeReveal";
import MosaicGallery from "@/components/shared/blocks/MosaicGallery";
import PhotoSplit from "@/components/shared/blocks/PhotoSplit";
import PolaroidCollage from "@/components/shared/blocks/PolaroidCollage";
import SectionIntro from "@/components/shared/blocks/SectionIntro";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import HeartMotif from "@/components/shared/motifs/HeartMotif";
import BodyText from "@/components/shared/primitives/BodyText";
import ScriptHeading from "@/components/shared/primitives/ScriptHeading";
import ClosingCard from "@/components/shared/sections/ClosingCard";
import FamilyCards from "@/components/shared/sections/FamilyCards";
import GiftQRPair from "@/components/shared/sections/GiftQRPair";
import LegalFooter from "@/components/shared/sections/LegalFooter";
import MapSection from "@/components/shared/sections/MapSection";
import ScheduleList, {
  type ScheduleItem,
} from "@/components/shared/sections/ScheduleList";
import { buildStyleVars } from "@/components/templates/style-options";
import {
  fieldMap,
  textValue,
  type TemplateProps,
} from "@/components/templates/types";
import { demoMeta as meta } from "./meta";

const WEEKDAYS = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

const pad = (n: number) => String(n).padStart(2, "0");
const dmy = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const hm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const parseDate = (v: string) => {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};
/** Chữ cái đầu của tên gọi (từ cuối của họ tên): "Minh Khang" → "K". */
const initial = (name: string) =>
  (name.trim().split(/\s+/).pop() ?? "").charAt(0).toUpperCase();

/** Nền xen kẽ giữa các section — suy ra từ bg + muted của palette. */
const BAND = "color-mix(in srgb, var(--tpl-bg) 92%, var(--tpl-muted))";

export default function Demo({ data, style }: TemplateProps) {
  const fields = fieldMap(meta);
  const t = (key: string) => textValue(data, fields[key]);

  const groom = t("groom_name");
  const bride = t("bride_name");
  const sealLabel = `${initial(groom)}&${initial(bride)}`;

  const wedding = parseDate(t("date_time"));
  const engagement = parseDate(t("engagement_date_time"));
  const reception = parseDate(t("reception_date_time"));

  const dayLine = (d: Date) => `${WEEKDAYS[d.getDay()]}, ${dmy(d)}`;
  const coverDate = wedding
    ? `${pad(wedding.getDate())} · ${pad(wedding.getMonth() + 1)} · ${wedding.getFullYear()}`
    : "";
  const cardDate = wedding
    ? `${WEEKDAYS[wedding.getDay()].toUpperCase()} · ${pad(wedding.getDate())}.${pad(
        wedding.getMonth() + 1,
      )}.${wedding.getFullYear()}`
    : "";
  const monthTitle = wedding
    ? `Tháng ${wedding.getMonth() + 1} · ${wedding.getFullYear()}`
    : "";

  const schedule: ScheduleItem[] = [];
  if (engagement) {
    schedule.push({
      time: hm(engagement),
      title: "Lễ đính hôn (Ăn hỏi)",
      lines: [dayLine(engagement), t("engagement_venue")],
    });
  }
  if (wedding) {
    schedule.push({
      time: hm(wedding),
      title: "Lễ thành hôn (Rước dâu)",
      lines: [dayLine(wedding), t("lunar_date"), t("wedding_venue")],
    });
  }
  if (reception) {
    schedule.push({
      time: hm(reception),
      title: "Tiệc cưới",
      lines: [
        `${dayLine(reception)}${t("reception_note") ? ` · ${t("reception_note")}` : ""}`,
        [t("venue_name"), t("venue_hall")].filter(Boolean).join(" · "),
        t("venue_address"),
      ],
    });
  }

  const engagementInMonth =
    engagement &&
    wedding &&
    engagement.getMonth() === wedding.getMonth() &&
    engagement.getFullYear() === wedding.getFullYear()
      ? engagement.getDate()
      : null;

  const vars = {
    ...buildStyleVars(meta, style),
    // Template này dùng Great Vibes cho chữ viết tay và một sắc tối suy ra từ màu chủ đạo.
    "--tpl-font-script": "var(--font-great-vibes)",
    "--tpl-dark": "color-mix(in srgb, var(--tpl-primary) 68%, #000)",
  } as CSSProperties;

  const photos = {
    p1: t("cover_photo"),
    p2: t("photo_2"),
    p3: t("photo_3"),
    p4: t("photo_4"),
  };

  const softLight = "color-mix(in srgb, var(--tpl-bg) 88%, transparent)";
  const gold = "#D9C9A3";

  return (
    <div
      className="tpl-body relative min-h-full"
      style={{
        ...vars,
        backgroundColor: "var(--tpl-bg)",
        color: "var(--tpl-text)",
      }}
    >
      <div className="mx-auto w-full max-w-[430px]">
        {/* ============ 1. PHONG THƯ ============ */}
        <EnvelopeReveal
          sealLabel={sealLabel}
          cover={
            <>
              <div className="text-[11px] uppercase tracking-[5px]" style={{ color: softLight }}>
                Thiệp mời cưới
              </div>
              <div
                className="tpl-script mt-[18px] text-[46px] leading-[1.1]"
                style={{ color: "var(--tpl-bg)" }}
              >
                {groom}
              </div>
              <div className="tpl-heading text-[22px] italic" style={{ color: gold }}>
                &amp;
              </div>
              <div
                className="tpl-script text-[46px] leading-[1.1]"
                style={{ color: "var(--tpl-bg)" }}
              >
                {bride}
              </div>
              <div
                className="tpl-heading mt-3.5 text-lg tracking-[4px]"
                style={{ color: softLight }}
              >
                {coverDate}
              </div>
            </>
          }
          card={
            <>
              <div className="text-[11px] uppercase tracking-[5px]" style={{ color: softLight }}>
                We are getting married
              </div>
              <ArchPhoto
                src={photos.p1}
                alt="Cô dâu chú rể"
                className="mt-[18px]"
                focus="center 40%"
              />
              <div className="mt-[18px] flex items-baseline gap-2.5">
                <span className="tpl-script whitespace-nowrap text-[34px]" style={{ color: "var(--tpl-bg)" }}>
                  {groom}
                </span>
                <span className="tpl-heading shrink-0 text-[22px] italic" style={{ color: gold }}>
                  &amp;
                </span>
                <span className="tpl-script whitespace-nowrap text-[34px]" style={{ color: "var(--tpl-bg)" }}>
                  {bride}
                </span>
              </div>
              <div
                className="tpl-heading mt-1 text-[17px] tracking-[3px]"
                style={{ color: softLight }}
              >
                {cardDate}
              </div>
              <div
                className="tpl-heading mt-3 max-w-[300px] text-center text-[17px] italic"
                style={{ color: gold }}
              >
                “{t("cover_quote")}”
              </div>
            </>
          }
        />

        {/* ============ 2. LỜI NGỎ ============ */}
        <RevealOnScroll>
          <section className="flex flex-col items-center gap-[18px] px-8 pb-14 pt-[72px] text-center">
            <ScriptHeading className="text-[40px]">Save the date</ScriptHeading>
            <span className="h-px w-12" style={{ background: "#B9A57C" }} />
            <p className="tpl-heading text-[21px] leading-normal">{t("opening_quote")}</p>
            <BodyText className="text-sm leading-[1.75]" tone="muted">
              {t("opening_letter")}
            </BodyText>
            <div
              className="mt-2 flex items-center gap-3.5"
              style={{ color: "var(--tpl-primary)" }}
            >
              <span className="tpl-heading text-[44px]">{initial(groom)}</span>
              <HeartMotif size={22} filled className="!text-[color:var(--tpl-accent)]" />
              <span className="tpl-heading text-[44px]">{initial(bride)}</span>
            </div>
          </section>
        </RevealOnScroll>

        {/* ============ 3. LỊCH ============ */}
        {wedding && (
          <RevealOnScroll>
            <section
              className="flex flex-col gap-6 px-5 py-14"
              style={{ background: BAND }}
            >
              <SectionIntro kicker="Đánh dấu ngày" title={monthTitle} />
              <CalendarMonth
                date={wedding}
                variant="paper"
                dotDays={engagementInMonth ? [engagementInMonth] : []}
                legend={
                  <>
                    <span className="flex items-center gap-1.5">
                      <HeartMotif size={14} filled className="!text-[color:var(--tpl-accent)]" />
                      Lễ thành hôn {pad(wedding.getDate())}/{pad(wedding.getMonth() + 1)}
                    </span>
                    {engagement && engagementInMonth && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="size-1.5 rounded-full"
                          style={{ background: "var(--tpl-primary)" }}
                        />
                        Đính hôn {pad(engagement.getDate())}/{pad(engagement.getMonth() + 1)}
                      </span>
                    )}
                  </>
                }
              />
              {t("calendar_note") && (
                <p
                  className="tpl-heading text-center text-lg italic"
                  style={{ color: "var(--tpl-text)", opacity: 0.85 }}
                >
                  {t("calendar_note")}
                </p>
              )}
            </section>
          </RevealOnScroll>
        )}

        {/* ============ ẢNH 01 ============ */}
        <RevealOnScroll>
          <section className="flex flex-col gap-7 px-5 pb-12 pt-14">
            <SectionIntro kicker="Our moments" title="Khoảnh khắc yêu thương" />
            <PhotoSplit
              src={photos.p1}
              alt="Cô dâu chú rể trong khu vườn xanh"
              index="01"
              quote={t("moment_1_quote")}
              label={t("moment_1_label")}
              focus="60% 45%"
            />
          </section>
        </RevealOnScroll>

        {/* ============ 4. NHÀ TRAI – NHÀ GÁI ============ */}
        <RevealOnScroll>
          <section
            className="flex flex-col gap-8 px-5 py-14"
            style={{ background: BAND }}
          >
            <SectionIntro kicker="Hai gia đình" title="Trân trọng báo tin" />
            <FamilyCards
              families={[
                {
                  label: "Nhà trai",
                  names: t("groom_parents"),
                  address: t("groom_address"),
                  role: t("groom_role"),
                  person: groom,
                },
                {
                  label: "Nhà gái",
                  names: t("bride_parents"),
                  address: t("bride_address"),
                  role: t("bride_role"),
                  person: bride,
                },
              ]}
            />
            {t("families_note") && (
              <p
                className="tpl-heading text-center text-[17px] italic leading-normal"
                style={{ color: "var(--tpl-text)", opacity: 0.85 }}
              >
                {t("families_note")}
              </p>
            )}
          </section>
        </RevealOnScroll>

        {/* ============ ẢNH 02 ============ */}
        <RevealOnScroll>
          <section className="px-5 py-12">
            <PhotoSplit
              src={photos.p2}
              alt="Cô dâu cầm bó hoa hồng trắng bên chú rể"
              index="02"
              quote={t("moment_2_quote")}
              label={t("moment_2_label")}
              textSide="right"
              focus="40% 60%"
              className="h-[360px]"
            />
          </section>
        </RevealOnScroll>

        {/* ============ 5. SỰ KIỆN + BẢN ĐỒ ============ */}
        <RevealOnScroll>
          <section
            className="flex flex-col gap-7 px-5 py-14"
            style={{ background: BAND }}
          >
            <SectionIntro kicker="Chương trình" title="Ngày vui của chúng mình" />
            <ScheduleList items={schedule} />
            <div className="-mx-6">
              <MapSection heading="" venueName={t("venue_name")} address={t("venue_address")} />
            </div>
          </section>
        </RevealOnScroll>

        {/* ============ ẢNH 03 ============ */}
        <RevealOnScroll>
          <section className="px-5 py-12">
            <PolaroidCollage
              first={{
                src: photos.p3,
                alt: "Cô dâu ngồi trên xe mui trần, chú rể tựa cửa xe",
                caption: t("polaroid_1_caption"),
                focus: "55% 55%",
              }}
              second={{
                src: photos.p4,
                alt: "Cô dâu khoác tay chú rể dưới cổng hoa",
                caption: t("polaroid_2_caption"),
                focus: "50% 62%",
              }}
              index="03"
              quote={t("moment_3_quote")}
              promise={t("moment_3_promise")}
            />
          </section>
        </RevealOnScroll>

        {/* ============ 7. MỪNG CƯỚI ============ */}
        <RevealOnScroll>
          <section
            className="flex flex-col gap-6 px-5 py-14"
            style={{ background: BAND }}
          >
            <SectionIntro
              kicker="Hộp mừng cưới"
              title="Gửi lời chúc phúc"
              description="Nếu không thể đến chung vui, bạn có thể gửi lời chúc qua mã QR bên dưới."
            />
            <GiftQRPair
              items={[
                {
                  label: "Chú rể",
                  qrImage: t("groom_qr_image"),
                  holder: t("groom_account_name"),
                  bank: t("groom_bank"),
                  seed: 20261220,
                },
                {
                  label: "Cô dâu",
                  qrImage: t("bride_qr_image"),
                  holder: t("bride_account_name"),
                  bank: t("bride_bank"),
                  seed: 19930615,
                },
              ]}
            />
            {!t("groom_qr_image") && !t("bride_qr_image") && (
              <p
                className="text-center text-[11px]"
                style={{ color: "var(--tpl-text)", opacity: 0.7 }}
              >
                Mã QR minh hoạ — thay bằng mã thật trước khi gửi thiệp.
              </p>
            )}
          </section>
        </RevealOnScroll>

        {/* ============ ẢNH 04 ============ */}
        <RevealOnScroll>
          <section className="px-5 pb-14 pt-12">
            <MosaicGallery
              main={{
                src: photos.p4,
                alt: "Cô dâu chú rể giữa hoa lan trắng",
                caption: t("mosaic_main_caption"),
                focus: "45% 45%",
              }}
              small={[
                {
                  src: photos.p2,
                  alt: "Nụ cười cô dâu chú rể",
                  caption: t("mosaic_small_1_caption"),
                  focus: "50% 30%",
                },
                {
                  src: photos.p3,
                  alt: "Chú rể tựa cửa xe",
                  caption: t("mosaic_small_2_caption"),
                  focus: "85% 50%",
                },
              ]}
            />
          </section>
        </RevealOnScroll>

        {/* ============ 8. LỜI CẢM ƠN ============ */}
        <ClosingCard
          photo={photos.p2}
          message={t("thank_you")}
          signature={`${groom} & ${bride}${coverDate ? ` · ${coverDate.replaceAll(" · ", ".")}` : ""}`}
        />

        <LegalFooter muted />
      </div>
    </div>
  );
}
