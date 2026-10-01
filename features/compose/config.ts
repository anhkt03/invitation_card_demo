import { birthdayTemplate1Meta } from "@/components/templates/birthday/BirthdayTemplate1/meta";
import { graduationTemplate1Meta } from "@/components/templates/graduation/GraduationTemplate1/meta";
import { grandOpeningTemplate1Meta } from "@/components/templates/grand-opening/GrandOpeningTemplate1/meta";
import type {
  FieldDef,
  TemplatePalette,
} from "@/components/templates/types";
import type {
  ComposeCategory,
  CoverStyle,
  MotifId,
  SectionType,
} from "./recipe";

/** Field lời chúc + ảnh chân dung — bổ sung cho mọi category để ghép được các block mới. */
const WISHES_FIELD: FieldDef = {
  key: "wishes",
  type: "textarea",
  label: "Lời chúc (mỗi dòng: Tên: lời chúc)",
  group: "Lời chúc",
  rows: 4,
  optional: true,
  default:
    "Việt Anh: Chúc bạn thật nhiều hạnh phúc!\nMinh Duy: Chúc mừng nhé!\nLan Anh: Gửi đến bạn những lời chúc tốt lành!",
  hint: "Mỗi dòng một lời chúc, dạng: Tên: nội dung.",
};

function portraitField(sample: string): FieldDef {
  return {
    key: "portrait",
    type: "image",
    label: "Ảnh chân dung",
    group: "Ảnh",
    optional: true,
    default: sample,
  };
}

/** role → key của field trong data; section đọc theo role nên dùng chung mọi category. */
export type Refs = Record<string, string>;

export type ComposeConfig = {
  category: ComposeCategory;
  categoryLabel: string;
  fields: FieldDef[];
  palettes: TemplatePalette[];
  sectionPool: SectionType[];
  coverStyles: CoverStyle[];
  motifs: MotifId[];
  refs: Refs;
  /** Dòng chữ nhỏ trên bìa (Save the date...). */
  kicker: string;
  coverSubtitle: string;
  thankHeading: string;
  /** Ảnh nền dùng cho cover "photo" (bìa ảnh). */
  coverPhoto: string;
};

const G = "/templates/graduation/1";
const B = "/templates/birthday/1";
const O = "/templates/grand-opening/1";

/**
 * Category dựng tự động từ thư viện section. Wedding KHÔNG nằm ở đây: thiệp cưới
 * được lắp tay trong components/templates/wedding/ (mỗi mẫu một bố cục riêng).
 */
export const COMPOSE_CONFIG: Record<ComposeCategory, ComposeConfig> = {
  graduation: {
    category: "graduation",
    categoryLabel: "Lễ tốt nghiệp",
    fields: [
      ...graduationTemplate1Meta.fields,
      WISHES_FIELD,
      portraitField(`${G}/gallery-1.svg`),
    ],
    palettes: graduationTemplate1Meta.palettes,
    coverStyles: ["cloud", "photo", "center", "framed", "motif"],
    motifs: ["laurel", "star", "cornerFloral"],
    coverPhoto: `${G}/cover.svg`,
    sectionPool: [
      "letter",
      "poem",
      "event",
      "calendar",
      "countdown",
      "portrait",
      "gallery",
      "story",
      "map",
      "wishes",
    ],
    refs: {
      title: "graduate_name",
      ceremonyName: "ceremony_name",
      dateTime: "date_time",
      note: "event_note",
      venueName: "venue_name",
      venueAddress: "venue_address",
      letter: "opening_letter",
      invitation: "invitation",
      story: "journey",
      gallery: "gallery",
      thankYou: "thank_you",
      wishes: "wishes",
      portrait: "portrait",
      subInfo: "degree",
      subInfo2: "school",
    },
    kicker: "Graduation day",
    coverSubtitle: "Trân trọng kính mời tới dự lễ tốt nghiệp",
    thankHeading: "Hẹn gặp bạn!",
  },

  birthday: {
    category: "birthday",
    categoryLabel: "Sinh nhật",
    fields: [
      ...birthdayTemplate1Meta.fields,
      WISHES_FIELD,
      portraitField(`${B}/gallery-1.svg`),
    ],
    palettes: birthdayTemplate1Meta.palettes,
    coverStyles: ["photo", "center", "motif", "framed"],
    motifs: ["balloon", "cake", "partyhat", "star"],
    coverPhoto: `${B}/cover.svg`,
    sectionPool: [
      "ageBadge",
      "letter",
      "event",
      "countdown",
      "calendar",
      "gallery",
      "wishes",
      "portrait",
      "map",
    ],
    refs: {
      title: "celebrant_name",
      ceremonyName: "party_name",
      dateTime: "date_time",
      note: "dress_code",
      venueName: "venue_name",
      venueAddress: "venue_address",
      letter: "opening_letter",
      invitation: "invitation",
      gallery: "gallery",
      thankYou: "thank_you",
      wishes: "wishes",
      portrait: "portrait",
      age: "age",
    },
    kicker: "Happy birthday",
    coverSubtitle: "Mời bạn đến chung vui tiệc sinh nhật",
    thankHeading: "Hẹn gặp bạn!",
  },

  "grand-opening": {
    category: "grand-opening",
    categoryLabel: "Khai trương",
    fields: [...grandOpeningTemplate1Meta.fields, WISHES_FIELD],
    palettes: grandOpeningTemplate1Meta.palettes,
    coverStyles: ["photo", "center", "framed", "motif"],
    motifs: ["firework", "lantern", "ribbon", "star"],
    coverPhoto: `${O}/cover.svg`,
    sectionPool: [
      "letter",
      "event",
      "calendar",
      "countdown",
      "story",
      "promo",
      "gallery",
      "map",
      "wishes",
      "hotline",
    ],
    refs: {
      title: "brand_name",
      tagline: "tagline",
      ceremonyName: "event_name",
      dateTime: "date_time",
      note: "event_note",
      venueName: "venue_name",
      venueAddress: "venue_address",
      letter: "opening_letter",
      invitation: "invitation",
      story: "program",
      promo: "promo",
      gallery: "gallery",
      thankYou: "thank_you",
      wishes: "wishes",
      hotline: "hotline",
    },
    kicker: "Grand opening",
    coverSubtitle: "Trân trọng kính mời tới dự lễ khai trương",
    thankHeading: "Trân trọng!",
  },
};
