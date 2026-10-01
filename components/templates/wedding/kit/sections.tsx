"use client";

import type { ReactNode } from "react";
import CalendarMonth from "@/components/shared/blocks/CalendarMonth";
import CountdownBoxes from "@/components/shared/blocks/CountdownBoxes";
import WishesBubbles from "@/components/shared/blocks/WishesBubbles";
import KenBurns from "@/components/shared/effects/KenBurns";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import PhotoFrame, { type FrameVariant } from "@/components/shared/frames/PhotoFrame";
import GiftBox from "@/components/shared/interactive/GiftBox";
import CoupleConverge from "@/components/shared/layouts/CoupleConverge";
import Gallery, { type GalleryLayout } from "@/components/shared/layouts/Gallery";
import PhotoBackdrop, { backdropVars } from "@/components/shared/layouts/PhotoBackdrop";
import HeartMotif from "@/components/shared/motifs/HeartMotif";
import BodyText from "@/components/shared/primitives/BodyText";
import ScriptHeading from "@/components/shared/primitives/ScriptHeading";
import Signature from "@/components/shared/primitives/Signature";
import MapSection from "@/components/shared/sections/MapSection";
import ScheduleList from "@/components/shared/sections/ScheduleList";
import { cn } from "@/lib/cn";
import type { Motion } from "./motion";
import type { WeddingView } from "./read";
import { Heading, Section } from "./ui";

/**
 * Các section dựng sẵn cho thiệp cưới. Quy ước chung:
 * - nhận `w` (view model đọc từ JSON) + `m` (bộ animation) + `band` (nền xen kẽ);
 * - thiếu dữ liệu thì trả về null — không để lại tiêu đề trống.
 */
type Base = { w: WeddingView; m: Motion; band?: boolean };

// ==================== LỜI NGỎ ====================
export function OpeningSection({
  w,
  m,
  band,
  monogram = true,
}: Base & { monogram?: boolean }) {
  if (!w.openingQuote && !w.letter && !w.invitation) return null;
  return (
    <Section band={band} className="items-center text-center">
      <RevealOnScroll variant={m.heading}>
        <ScriptHeading className="text-4xl">Thư ngỏ</ScriptHeading>
      </RevealOnScroll>
      {w.openingQuote && (
        <RevealOnScroll variant={m.block} delay={80}>
          <p className="tpl-heading text-xl italic leading-normal">{w.openingQuote}</p>
        </RevealOnScroll>
      )}
      {w.letter && (
        <RevealOnScroll variant={m.block} delay={160}>
          <BodyText tone="muted" className="text-sm leading-[1.8]">
            {w.letter}
          </BodyText>
        </RevealOnScroll>
      )}
      {w.invitation && (
        <RevealOnScroll variant={m.block} delay={240}>
          <p className="tpl-heading text-lg" style={{ color: "var(--tpl-primary)" }}>
            {w.invitation}
          </p>
        </RevealOnScroll>
      )}
      {monogram && w.initials && (
        <RevealOnScroll variant="zoomIn" delay={320}>
          <div className="flex items-center gap-3.5" style={{ color: "var(--tpl-primary)" }}>
            <span className="tpl-heading text-4xl">{w.initials.groom}</span>
            <HeartMotif size={22} filled className="!text-[color:var(--tpl-accent)]" />
            <span className="tpl-heading text-4xl">{w.initials.bride}</span>
          </div>
        </RevealOnScroll>
      )}
    </Section>
  );
}

// ==================== CÔ DÂU & CHÚ RỂ ====================
export function CoupleSection({
  w,
  m,
  band,
  frame = "arch",
  connector = "heart",
  title = "Hai chúng mình",
}: Base & {
  frame?: FrameVariant;
  connector?: "heart" | "ampersand" | "none";
  title?: string;
}) {
  const hasAny = w.groom.photo || w.bride.photo || w.groom.name || w.bride.name;
  if (!hasAny) return null;
  return (
    <Section band={band} className="gap-5">
      <Heading kicker="Chú rể & Cô dâu" title={title} m={m} />
      <CoupleConverge
        left={{ name: w.groom.name, photo: w.groom.photo, role: "Chú rể" }}
        right={{ name: w.bride.name, photo: w.bride.photo, role: "Cô dâu" }}
        frame={frame}
        connector={connector}
      />
    </Section>
  );
}

// ==================== HAI GIA ĐÌNH ====================
function FamilyCard({
  label,
  parents,
  address,
  role,
  person,
  plain = false,
}: {
  label: string;
  parents: string;
  address: string;
  role: string;
  person: string;
  /** Không nền thẻ — dùng khi đặt cạnh ảnh. */
  plain?: boolean;
}) {
  return (
    <div
      className="flex h-full flex-col items-center gap-2.5 rounded-md px-3.5 py-6 text-center"
      style={plain ? undefined : { background: "var(--tpl-surface)" }}
    >
      <div
        className="text-[11px] font-semibold uppercase tracking-[0.3em]"
        style={{ color: "var(--tpl-primary)" }}
      >
        {label}
      </div>
      {parents && (
        <p className="tpl-heading whitespace-pre-line text-base leading-[1.45]">{parents}</p>
      )}
      {address && (
        <p
          className="whitespace-pre-line text-xs leading-relaxed"
          style={{ color: "var(--tpl-text)", opacity: 0.7 }}
        >
          {address}
        </p>
      )}
      {(role || person) && (
        <span className="my-1 h-px w-7" style={{ background: "var(--tpl-accent)", opacity: 0.6 }} />
      )}
      {role && (
        <div className="text-[10px] uppercase tracking-[3px]" style={{ color: "var(--tpl-muted)" }}>
          {role}
        </div>
      )}
      {person && <div className="tpl-script text-3xl leading-[1.1]">{person}</div>}
    </div>
  );
}

export function FamiliesSection({
  w,
  m,
  band,
  variant = "cards",
}: Base & {
  /** cards: hai thẻ cạnh nhau · edge: ảnh chân dung dính mép trái/phải, chữ ở phía đối diện. */
  variant?: "cards" | "edge";
}) {
  const sides = [
    { label: "Nhà trai", p: w.groom },
    { label: "Nhà gái", p: w.bride },
  ].filter(({ p }) => p.parents || p.address || p.role);
  if (sides.length === 0) return null;

  const note = w.familiesNote && (
    <RevealOnScroll variant={m.block}>
      <p className="tpl-heading px-5 text-center text-base italic leading-normal opacity-85">
        {w.familiesNote}
      </p>
    </RevealOnScroll>
  );

  if (variant === "edge") {
    return (
      <Section band={band} className="gap-10 px-0">
        <div className="px-5">
          <Heading kicker="Hai gia đình" title="Trân trọng báo tin" m={m} />
        </div>
        {sides.map(({ label, p }, i) => {
          const photoLeft = i % 2 === 0;
          const photo = p.photo ? (
            <RevealOnScroll variant={photoLeft ? "left" : "right"} distance="45%" duration={1100}>
              <div
                className={cn(
                  "overflow-hidden border-[5px] shadow-xl",
                  photoLeft ? "rounded-r-2xl border-l-0" : "rounded-l-2xl border-r-0",
                )}
                style={{ borderColor: "var(--tpl-surface)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- ảnh có thể là URL ngoài do người tạo thiệp gửi */}
                <img src={p.photo} alt={p.name} loading="lazy" className="block aspect-[3/4] w-full object-cover" />
              </div>
            </RevealOnScroll>
          ) : null;
          const text = (
            <RevealOnScroll variant={photoLeft ? m.sideB : m.sideA} delay={150}>
              <FamilyCard
                plain
                label={label}
                parents={p.parents}
                address={p.address}
                role={p.role}
                person={p.name}
              />
            </RevealOnScroll>
          );
          return (
            <div
              key={label}
              className={cn(
                "grid items-center gap-2",
                photo ? (photoLeft ? "grid-cols-[46%_1fr]" : "grid-cols-[1fr_46%]") : "px-5",
              )}
            >
              {photoLeft ? (
                <>
                  {photo}
                  {text}
                </>
              ) : (
                <>
                  {text}
                  {photo}
                </>
              )}
            </div>
          );
        })}
        {note}
      </Section>
    );
  }

  return (
    <Section band={band}>
      <Heading kicker="Hai gia đình" title="Trân trọng báo tin" m={m} />
      <div className={cn("grid gap-3", sides.length > 1 ? "grid-cols-2" : "mx-auto max-w-[230px]")}>
        {sides.map(({ label, p }, i) => (
          <RevealOnScroll key={label} variant={i % 2 === 0 ? m.sideA : m.sideB}>
            <FamilyCard
              label={label}
              parents={p.parents}
              address={p.address}
              role={p.role}
              person={p.name}
            />
          </RevealOnScroll>
        ))}
      </div>
      {note}
    </Section>
  );
}

// ==================== CHƯƠNG TRÌNH ====================
export function ScheduleSection({ w, m, band }: Base) {
  if (w.events.length === 0) return null;
  return (
    <Section band={band}>
      <Heading kicker="Chương trình" title="Ngày vui của chúng mình" m={m} />
      <RevealOnScroll variant={m.block}>
        <ScheduleList items={w.events} />
      </RevealOnScroll>
    </Section>
  );
}

// ==================== LỊCH + ĐẾM NGƯỢC ====================
export function CalendarSection({
  w,
  m,
  band,
  countdown = "light",
}: Base & { countdown?: "light" | "dark" | "none" }) {
  if (!w.date) return null;
  const mm = String(w.date.getMonth() + 1).padStart(2, "0");
  const dd = String(w.date.getDate()).padStart(2, "0");
  return (
    <Section band={band}>
      <Heading
        kicker="Đánh dấu ngày"
        title={`Tháng ${w.date.getMonth() + 1} · ${w.date.getFullYear()}`}
        m={m}
      />
      <RevealOnScroll variant={m.block}>
        <CalendarMonth
          date={w.date}
          variant="paper"
          dotDays={w.engagementSameMonth && w.engagementDay ? [w.engagementDay] : []}
          legend={
            <>
              <span className="flex items-center gap-1.5">
                <HeartMotif size={14} filled className="!text-[color:var(--tpl-accent)]" />
                Ngày cưới {dd}/{mm}
              </span>
              {w.engagementSameMonth && w.engagementDay && (
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full" style={{ background: "var(--tpl-primary)" }} />
                  Đính hôn {String(w.engagementDay).padStart(2, "0")}/{mm}
                </span>
              )}
            </>
          }
        />
      </RevealOnScroll>
      {w.calendarNote && (
        <RevealOnScroll variant={m.block}>
          <p className="tpl-heading text-center text-lg italic opacity-85">{w.calendarNote}</p>
        </RevealOnScroll>
      )}
      {countdown !== "none" && (
        <RevealOnScroll variant="zoomIn" className="flex flex-col items-center gap-3">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: "var(--tpl-muted)" }}>
            Còn lại
          </p>
          <CountdownBoxes target={w.date} variant={countdown} />
        </RevealOnScroll>
      )}
    </Section>
  );
}

// ==================== CHUYỆN TÌNH YÊU ====================
export function StorySection({ w, m, band }: Base) {
  if (w.story.length === 0) return null;
  return (
    <Section band={band}>
      <Heading kicker="Our story" title="Chuyện tình yêu" m={m} />
      <div className="relative">
        <span
          aria-hidden
          className="absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2"
          style={{ background: "color-mix(in srgb, var(--tpl-primary) 38%, transparent)" }}
        />
        {w.story.map((item, i) => {
          const leftSide = i % 2 === 0;
          const content = (
            <div className={cn("flex flex-col gap-1", leftSide ? "items-end text-right" : "items-start text-left")}>
              {item.when && (
                <p className="tpl-heading text-2xl leading-none" style={{ color: "var(--tpl-primary)" }}>
                  {item.when}
                </p>
              )}
              <p className="text-sm leading-6" style={{ color: "var(--tpl-text)", opacity: 0.85 }}>
                {item.text}
              </p>
            </div>
          );
          return (
            <RevealOnScroll
              key={`${item.when}-${i}`}
              variant={leftSide ? m.sideA : m.sideB}
              className="relative grid grid-cols-2 gap-x-7 py-3"
            >
              <span
                aria-hidden
                className="absolute left-1/2 top-[18px] size-3 -translate-x-1/2 rounded-full ring-4"
                style={{
                  background: "var(--tpl-accent)",
                  ["--tw-ring-color" as string]: "var(--tpl-bg)",
                }}
              />
              {leftSide ? (
                <>
                  {content}
                  <div />
                </>
              ) : (
                <>
                  <div />
                  {content}
                </>
              )}
            </RevealOnScroll>
          );
        })}
      </div>
    </Section>
  );
}

// ==================== ALBUM ẢNH ====================
export function GallerySection({
  w,
  m,
  band,
  layout = "grid",
  frame,
  kicker = "Our moments",
  title = "Album ảnh cưới",
  from = 0,
  count,
}: Base & {
  layout?: GalleryLayout;
  frame?: FrameVariant;
  kicker?: string;
  /** Tiêu đề section; truyền "" để ẩn cả phần tiêu đề (khi ghép nhiều layout liền nhau). */
  title?: string;
  /** Lấy ảnh từ vị trí `from`, tối đa `count` ảnh — để một thiệp dùng nhiều layout trên các ảnh khác nhau. */
  from?: number;
  count?: number;
}) {
  const images = w.gallery.slice(from, count ? from + count : undefined);
  if (images.length === 0) return null;
  return (
    <Section band={band} className={title ? undefined : "py-6"}>
      {title && <Heading kicker={kicker} title={title} m={m} />}
      <Gallery
        images={images}
        layout={layout}
        frame={frame}
        captions={w.captions.slice(from)}
        words={w.bannerWords}
      />
    </Section>
  );
}

// ==================== LỜI CHÚC ====================
export function WishesSection({ w, m, band }: Base) {
  if (!w.wishes) return null;
  return (
    <Section band={band}>
      <Heading kicker="Lưu bút" title="Lời chúc gửi đến" m={m} />
      <RevealOnScroll variant={m.block}>
        <WishesBubbles lines={w.wishes} />
      </RevealOnScroll>
    </Section>
  );
}

// ==================== ĐỊA ĐIỂM ====================
export function VenueSection({ w, m, band }: Base) {
  if (!w.venue.has) return null;
  return (
    <Section band={band} className="px-0">
      <div className="px-5">
        <Heading kicker="Địa điểm" title="Đường đến ngày vui" m={m} />
      </div>
      <RevealOnScroll variant={m.block}>
        <MapSection
          heading=""
          venueName={w.venue.line}
          address={w.venue.address}
          mapUrl={w.venue.mapUrl}
        />
      </RevealOnScroll>
    </Section>
  );
}

// ==================== MỪNG CƯỚI ====================
function GiftCards({ gifts }: { gifts: WeddingView["gifts"] }) {
  return (
    <div className={cn("grid gap-3", gifts.length > 1 ? "grid-cols-2" : "mx-auto max-w-[220px]")}>
      {gifts.map((g) => (
        <div
          key={g.label}
          className="flex flex-col items-center gap-2.5 rounded-md border px-3 py-[18px] text-center"
          style={{
            background: "var(--tpl-surface)",
            borderColor: "color-mix(in srgb, var(--tpl-muted) 28%, transparent)",
          }}
        >
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--tpl-primary)" }}
          >
            {g.label}
          </div>
          {g.qr && (
            <div className="rounded bg-white p-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- ảnh QR do người tạo thiệp gửi (URL ngoài) */}
              <img src={g.qr} alt={`Mã QR của ${g.label.toLowerCase()}`} className="block size-[112px] object-contain" />
            </div>
          )}
          {g.holder && (
            <div className="text-[13px] font-semibold" style={{ color: "var(--tpl-text)" }}>
              {g.holder}
            </div>
          )}
          {g.bank && (
            <p
              className="whitespace-pre-line text-[11px] leading-relaxed"
              style={{ color: "var(--tpl-text)", opacity: 0.72 }}
            >
              {g.bank}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function GiftSection({
  w,
  m,
  band,
  mode = "box",
  openOnView = false,
}: Base & { mode?: "box" | "cards"; openOnView?: boolean }) {
  if (w.gifts.length === 0) return null;
  const cards = <GiftCards gifts={w.gifts} />;
  return (
    <Section band={band}>
      <Heading kicker="Hộp mừng cưới" title="Gửi lời chúc phúc" description={w.giftNote} m={m} />
      {mode === "box" ? (
        <GiftBox openOnView={openOnView}>{cards}</GiftBox>
      ) : (
        <RevealOnScroll variant={m.block}>{cards}</RevealOnScroll>
      )}
    </Section>
  );
}

// ==================== CÂU TRÍCH (đặt trên nền ảnh) ====================
export function QuoteSection({ w, m, text }: Base & { text?: string }) {
  const q = text ?? w.openingQuote;
  if (!q) return null;
  return (
    <Section className="items-center py-24 text-center">
      <RevealOnScroll variant={m.heading} duration={1200}>
        <p className="tpl-script text-4xl leading-snug" style={{ color: "var(--tpl-primary)" }}>
          “{q}”
        </p>
      </RevealOnScroll>
    </Section>
  );
}

// ==================== CẢM ƠN ====================
function ThanksText({ w, m, heading, onPhoto }: Base & { heading: string; onPhoto?: boolean }) {
  const signature = [w.names, w.dateDots].filter(Boolean).join(" · ");
  return (
    <>
      <RevealOnScroll variant={m.heading}>
        <ScriptHeading className="text-5xl" tone={onPhoto ? "text" : "primary"}>
          {heading}
        </ScriptHeading>
      </RevealOnScroll>
      {w.thankYou && (
        <RevealOnScroll variant={m.block} delay={100}>
          <BodyText className="mx-auto max-w-[320px] text-[15px] italic leading-7">{w.thankYou}</BodyText>
        </RevealOnScroll>
      )}
      {signature && (
        <RevealOnScroll variant={m.block} delay={200}>
          <Signature className="text-lg">{signature}</Signature>
        </RevealOnScroll>
      )}
    </>
  );
}

/**
 * Lời cảm ơn cuối thiệp, dùng ảnh cảm ơn (thanks_photo, mặc định ảnh bìa):
 * - frame       ảnh trong khung phía trên chữ
 * - fullbleed   ảnh tràn khung, chữ trắng đè lên đáy ảnh
 * - background  ảnh làm nền tối phía sau chữ
 */
export function ThanksSection({
  w,
  m,
  band,
  variant = "frame",
  photoFrame = "arch",
  heading = "Trân trọng cảm ơn!",
  children,
}: Base & {
  variant?: "frame" | "fullbleed" | "background";
  photoFrame?: FrameVariant | null;
  heading?: string;
  children?: ReactNode;
}) {
  if (!w.thankYou && !w.names) return null;

  if (variant === "fullbleed" && w.thanksPhoto) {
    return (
      <section
        className="relative isolate overflow-hidden text-center text-white"
        style={{ ...backdropVars("dark"), background: "var(--tpl-dark)" }}
      >
        <KenBurns src={w.thanksPhoto} focus="50% 30%" direction="out" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />
        <div className="flex min-h-[600px] flex-col items-center justify-end gap-4 px-6 pb-16 pt-40">
          <ThanksText w={w} m={m} heading={heading} onPhoto />
          {children}
        </div>
      </section>
    );
  }

  if (variant === "background" && w.thanksPhoto) {
    return (
      <PhotoBackdrop src={w.thanksPhoto} tone="dark" kenburns>
        <Section className="items-center py-24 text-center">
          <ThanksText w={w} m={m} heading={heading} onPhoto />
          {children}
        </Section>
      </PhotoBackdrop>
    );
  }

  return (
    <Section band={band} className="items-center text-center">
      {photoFrame && w.thanksPhoto && (
        <RevealOnScroll variant={m.media} className="w-[46%]">
          <PhotoFrame src={w.thanksPhoto} variant={photoFrame} ratio="3/4" focus="50% 35%" />
        </RevealOnScroll>
      )}
      <ThanksText w={w} m={m} heading={heading} />
      {children}
    </Section>
  );
}

// ==================== NỘI DUNG LÁ THƯ MỜI ====================
/** Có đủ thông tin để viết một lá thư mời (tên, ngày hoặc địa điểm) chưa. */
export function hasLetter(w: WeddingView): boolean {
  return Boolean(w.names || w.date || w.venue.has || w.invitation);
}

/**
 * Nội dung tấm thiệp đặt trong phong thư / hòm thư: lời mời, tên đôi, ngày giờ, địa điểm.
 * Mỗi phần tự ẩn khi thiếu dữ liệu.
 */
export function LetterContent({ w }: { w: WeddingView }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: "var(--tpl-muted)" }}>
        Thiệp mời cưới
      </p>
      {w.invitation && (
        <p className="tpl-heading text-base italic leading-normal opacity-85">{w.invitation}</p>
      )}
      {w.names && (
        <div className="tpl-script text-[2.6rem] leading-[1.1]" style={{ color: "var(--tpl-primary)" }}>
          {w.groom.name && <div>{w.groom.name}</div>}
          {w.groom.name && w.bride.name && (
            <div className="tpl-heading text-xl italic" style={{ color: "var(--tpl-accent)" }}>
              &amp;
            </div>
          )}
          {w.bride.name && <div>{w.bride.name}</div>}
        </div>
      )}
      {w.date && (
        <div className="mt-1 flex flex-col items-center gap-0.5">
          <span className="h-px w-10" style={{ background: "var(--tpl-accent)", opacity: 0.6 }} />
          <p className="tpl-heading mt-2 text-lg tracking-[0.18em]">
            {w.weekday.toUpperCase()} · {w.time}
          </p>
          <p className="tpl-heading text-3xl" style={{ color: "var(--tpl-primary)" }}>
            {w.dateLabel}
          </p>
          {w.lunar && (
            <p className="text-xs" style={{ color: "var(--tpl-muted)" }}>
              {w.lunar}
            </p>
          )}
        </div>
      )}
      {w.venue.has && (
        <div className="mt-1 flex flex-col items-center gap-0.5 text-sm">
          {w.venue.line && <p className="font-semibold">{w.venue.line}</p>}
          {w.venue.address && (
            <p className="opacity-75" style={{ whiteSpace: "pre-line" }}>
              {w.venue.address}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
