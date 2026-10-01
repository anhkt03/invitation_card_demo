import type { DividerVariant } from "@/components/shared/primitives/Divider";
import type { ScaleId } from "@/components/templates/style-options";
import type {
  TemplateCategory,
  TemplatePalette,
} from "@/components/templates/types";

/** Category được dựng tự động từ thư viện section (wedding lắp tay, không ở đây). */
export type ComposeCategory = Exclude<TemplateCategory, "wedding">;

/** Các loại section có thể ghép vào một template. */
export type SectionType =
  | "letter"
  | "poem"
  | "hosts"
  | "event"
  | "calendar"
  | "countdown"
  | "gallery"
  | "story"
  | "map"
  | "gift"
  | "wishes"
  | "portrait"
  | "ageBadge"
  | "promo"
  | "hotline";

/** Kiểu màn bìa — điểm khác biệt lớn nhất giữa các mẫu. */
export type CoverStyle =
  | "photo" // ảnh nền + chữ đè
  | "cloud" // nền trời mây
  | "center" // nền màu, chữ giữa
  | "framed" // khung viền quanh chữ
  | "monogram" // chữ lồng lớn
  | "motif"; // hoạ tiết lớn trên đỉnh

/** Hoạ tiết trang trí. */
export type MotifId =
  | "rings"
  | "heart"
  | "lotus"
  | "monogram"
  | "laurel"
  | "star"
  | "balloon"
  | "cake"
  | "partyhat"
  | "firework"
  | "lantern"
  | "ribbon"
  | "cornerFloral";

export type NamesLayout = "inline" | "stacked" | "monogram";
export type CountdownVariant = "bar" | "boxesLight" | "boxesDark";

/** "Công thức" một template — dữ liệu tất định sinh từ seed, ghép các block lại. */
export type Recipe = {
  key: string;
  name: string;
  category: ComposeCategory;
  palette: TemplatePalette;
  headingFont: string;
  bodyFont: string;
  scale: ScaleId;

  // ----- bìa -----
  coverStyle: CoverStyle;
  namesLayout: NamesLayout;
  coverMotif: MotifId | null;
  particles: boolean;

  // ----- biến thể block -----
  countdownVariant: CountdownVariant;
  calendarDark: boolean;
  eventAsBlock: boolean; // EventInfoBlock (DateBlock) thay vì EventDetails

  // ----- section -----
  /** Các section theo thứ tự đã XÁO TRỘN (không gồm cover & lời cảm ơn). */
  sections: SectionType[];
  /** Hoạ tiết điểm nhấn phía trên một số section (song song với sections). */
  sectionMotifs: (MotifId | null)[];
  /** Divider giữa các section: dùng chung một kiểu, hay mỗi chỗ một kiểu. */
  dividerPerSection: boolean;
  divider: DividerVariant;
};
