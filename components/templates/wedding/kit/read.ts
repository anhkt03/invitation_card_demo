import type { AutoScrollSpeed } from "@/components/shared/interactive/AutoScroll";
import type { TemplateData } from "@/components/templates/types";

const WEEKDAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

const pad = (n: number) => String(n).padStart(2, "0");
const dmy = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const hm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const dayLine = (d: Date) => `${WEEKDAYS[d.getDay()]}, ${dmy(d)}`;

export function parseDate(v: string): Date | null {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Chữ cái đầu của tên gọi (từ cuối của họ tên): "Minh Khang" → "K". */
const initialOf = (name: string) =>
  (name.trim().split(/\s+/).pop() ?? "").charAt(0).toUpperCase();

export type Person = {
  name: string;
  role: string;
  photo: string;
  parents: string;
  address: string;
};

export type WeddingEvent = {
  id: "engagement" | "ceremony" | "reception";
  title: string;
  date: Date;
  time: string;
  /** Các dòng mô tả (ngày, địa điểm...) — đã bỏ dòng rỗng. */
  lines: string[];
};

export type StoryItem = { when: string; text: string };

export type GiftAccount = {
  label: string;
  qr: string;
  holder: string;
  bank: string;
};

const SPEEDS: AutoScrollSpeed[] = ["slow", "normal", "fast"];

/**
 * Đọc dữ liệu JSON của thiệp cưới thành "view model" sạch: mọi giá trị thiếu đều là
 * chuỗi rỗng / mảng rỗng / null để section tự ẩn — KHÔNG có giá trị mặc định ở đây.
 * Bộ key xem tại kit/fields.ts.
 */
export function readWedding(data: TemplateData) {
  const str = (key: string): string => {
    const v = data[key];
    return typeof v === "string" ? v.trim() : "";
  };
  const list = (key: string): string[] => {
    const v = data[key];
    return Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : [];
  };

  const groom: Person = {
    name: str("groom_name"),
    role: str("groom_role"),
    photo: str("groom_photo"),
    parents: str("groom_parents"),
    address: str("groom_address"),
  };
  const bride: Person = {
    name: str("bride_name"),
    role: str("bride_role"),
    photo: str("bride_photo"),
    parents: str("bride_parents"),
    address: str("bride_address"),
  };

  const engagement = parseDate(str("engagement_date_time"));
  const ceremony = parseDate(str("date_time"));
  const reception = parseDate(str("reception_date_time"));
  const lunar = str("lunar_date");

  const venue = {
    name: str("venue_name"),
    hall: str("venue_hall"),
    address: str("venue_address"),
  };
  const venueLine = [venue.name, venue.hall].filter(Boolean).join(" · ");
  const hasVenue = Boolean(venue.name || venue.address);
  const mapUrl =
    str("map_url") ||
    (hasVenue
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${venue.name} ${venue.address}`.trim(),
        )}`
      : "");

  const events: WeddingEvent[] = [];
  if (engagement) {
    events.push({
      id: "engagement",
      title: "Lễ đính hôn (Ăn hỏi)",
      date: engagement,
      time: hm(engagement),
      lines: [dayLine(engagement), str("engagement_venue")].filter(Boolean),
    });
  }
  if (ceremony) {
    events.push({
      id: "ceremony",
      title: "Lễ thành hôn",
      date: ceremony,
      time: hm(ceremony),
      lines: [dayLine(ceremony), lunar, str("wedding_venue")].filter(Boolean),
    });
  }
  if (reception) {
    const note = str("reception_note");
    events.push({
      id: "reception",
      title: "Tiệc cưới",
      date: reception,
      time: hm(reception),
      lines: [
        `${dayLine(reception)}${note ? ` · ${note}` : ""}`,
        venueLine,
        venue.address,
      ].filter(Boolean),
    });
  }

  // Ngày chính của thiệp: lễ thành hôn, không có thì tiệc cưới, rồi đính hôn.
  const date = ceremony ?? reception ?? engagement;

  const story: StoryItem[] = str("story_milestones")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(.{1,24}?)\s*[—–-]\s+(.+)$/);
      return m ? { when: m[1], text: m[2] } : { when: "", text: line };
    });

  const gifts: GiftAccount[] = [
    {
      label: "Chú rể",
      qr: str("groom_qr_image"),
      holder: str("groom_account_name"),
      bank: str("groom_bank"),
    },
    {
      label: "Cô dâu",
      qr: str("bride_qr_image"),
      holder: str("bride_account_name"),
      bank: str("bride_bank"),
    },
  ].filter((g) => g.qr || g.holder || g.bank);

  const names = [groom.name, bride.name].filter(Boolean).join(" & ");
  // Chữ cái đầu chỉ dùng khi dữ liệu bật `use_initials` (thiếu/null = không dùng) và có đủ cả hai tên.
  const initials =
    str("use_initials") === "true" && groom.name && bride.name
      ? { groom: initialOf(groom.name), bride: initialOf(bride.name) }
      : null;
  const speed = str("auto_scroll_speed") as AutoScrollSpeed;

  return {
    groom,
    bride,
    /** "Minh Khang & Thanh Hà" — chỉ gồm tên nào có. */
    names,
    /** Chữ cái đầu của hai tên, hoặc null nếu không dùng — các component tự quyết định hiển thị thay thế. */
    initials,
    /** Chữ trên con dấu sáp: "K&H" khi dùng chữ cái đầu, không thì trái tim. */
    seal: initials ? `${initials.groom}&${initials.bride}` : "♥",

    coverPhoto: str("cover_photo"),
    /** Ảnh nền / ảnh cảm ơn: bỏ trống thì dùng ảnh bìa (vẫn là ảnh của chính khách, không phải ảnh mẫu). */
    backgroundPhoto: str("background_photo") || str("cover_photo"),
    thanksPhoto: str("thanks_photo") || str("cover_photo"),
    /** Chú thích theo thứ tự ảnh trong album. */
    captions: str("gallery_captions")
      .split(/\r?\n/)
      .map((l) => l.trim()),
    /** Các từ trong dải chữ trên ảnh ("FALL IN | LOVE | FOREVER"). */
    bannerWords: str("banner_words").split("|").map((x) => x.trim()).filter(Boolean),
    coverQuote: str("cover_quote"),
    openingQuote: str("opening_quote"),
    letter: str("opening_letter"),
    invitation: str("invitation"),
    familiesNote: str("families_note"),
    calendarNote: str("calendar_note"),
    thankYou: str("thank_you"),

    date,
    /** "20 · 12 · 2026" */
    dateLabel: date ? `${pad(date.getDate())} · ${pad(date.getMonth() + 1)} · ${date.getFullYear()}` : "",
    /** "20.12.2026" */
    dateDots: date ? `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}` : "",
    weekday: date ? WEEKDAYS[date.getDay()] : "",
    time: date ? hm(date) : "",
    lunar,
    events,
    engagementDay: engagement ? engagement.getDate() : null,
    engagementSameMonth:
      engagement && date
        ? engagement.getMonth() === date.getMonth() && engagement.getFullYear() === date.getFullYear()
        : false,

    venue: { ...venue, line: venueLine, has: hasVenue, mapUrl },
    gallery: list("gallery"),
    story,
    wishes: str("wishes"),
    gifts,
    giftNote: str("gift_note"),

    autoScroll: str("auto_scroll") === "true",
    autoScrollSpeed: SPEEDS.includes(speed) ? speed : ("normal" as AutoScrollSpeed),
  };
}

export type WeddingView = ReturnType<typeof readWedding>;
