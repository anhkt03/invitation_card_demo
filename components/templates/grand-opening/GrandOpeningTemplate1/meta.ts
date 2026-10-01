import type { TemplateMeta } from "@/components/templates/types";
import {
  DEFAULT_BODY_FONT,
  DEFAULT_SCALE,
  HEADING_FONT_OPTIONS,
} from "@/components/templates/style-options";

const ASSETS = "/templates/grand-opening/1";

export const grandOpeningTemplate1Meta: TemplateMeta = {
  key: "GrandOpeningTemplate1",
  name: "Đại Lễ Khai Trương",
  category: "grand-opening",
  description:
    "Thiệp mời khai trương trang trọng tông đỏ – vàng: giới thiệu thương hiệu, chương trình buổi lễ, ưu đãi khai trương và bản đồ.",
  thumbnail: `${ASSETS}/cover.svg`,

  fields: [
    // ==================== THƯƠNG HIỆU ====================
    {
      key: "brand_name",
      type: "text",
      label: "Tên thương hiệu / cửa hàng",
      group: "Thương hiệu",
      default: "Nhà hàng Phương Nam",
      maxLength: 60,
    },
    {
      key: "tagline",
      type: "text",
      label: "Slogan / mô tả ngắn",
      group: "Thương hiệu",
      optional: true,
      default: "Ẩm thực miền Tây giữa lòng Sài Gòn",
      maxLength: 100,
    },
    {
      key: "hotline",
      type: "text",
      label: "Hotline đặt bàn / liên hệ",
      group: "Thương hiệu",
      optional: true,
      default: "1900 6868",
      maxLength: 30,
    },

    // ==================== BUỔI LỄ ====================
    {
      key: "event_name",
      type: "text",
      label: "Tên buổi lễ",
      group: "Buổi lễ",
      default: "ĐẠI LỄ KHAI TRƯƠNG",
      maxLength: 60,
    },
    {
      key: "date_time",
      type: "datetime",
      label: "Thời gian",
      group: "Buổi lễ",
      default: "2026-09-09T09:09",
    },
    {
      key: "event_note",
      type: "text",
      label: "Ghi chú",
      group: "Buổi lễ",
      optional: true,
      default: "",
      placeholder: "VD: Giờ hoàng đạo — nghi thức cắt băng lúc 09:09",
    },
    {
      key: "venue_name",
      type: "text",
      label: "Địa điểm",
      group: "Buổi lễ",
      default: "Nhà hàng Phương Nam — Chi nhánh 1",
      maxLength: 80,
    },
    {
      key: "venue_address",
      type: "textarea",
      label: "Địa chỉ",
      group: "Buổi lễ",
      rows: 2,
      default: "88 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    },
    {
      key: "program",
      type: "textarea",
      label: "Chương trình",
      group: "Buổi lễ",
      rows: 5,
      optional: true,
      default:
        "09:00 — Đón khách & khai mạc\n09:09 — Nghi thức cắt băng khai trương\n09:30 — Múa lân sư rồng chúc mừng\n10:00 — Tiệc nhẹ & bốc thăm trúng thưởng",
      hint: "Mỗi dòng một mục, dạng: Giờ — nội dung.",
    },

    // ==================== LỜI MỜI & ƯU ĐÃI ====================
    {
      key: "opening_letter",
      type: "textarea",
      label: "Thư ngỏ",
      group: "Lời mời & Ưu đãi",
      rows: 4,
      default:
        "Sau thời gian dài ấp ủ, chúng tôi hân hạnh mang đến một không gian ẩm thực hoàn toàn mới.\nBuổi lễ khai trương sẽ trọn vẹn hơn rất nhiều khi có sự góp mặt của quý khách.",
    },
    {
      key: "invitation",
      type: "textarea",
      label: "Lời mời",
      group: "Lời mời & Ưu đãi",
      rows: 2,
      default:
        "Trân trọng kính mời quý khách tới dự và chung vui cùng chúng tôi!",
    },
    {
      key: "promo",
      type: "textarea",
      label: "Ưu đãi khai trương",
      group: "Lời mời & Ưu đãi",
      rows: 3,
      optional: true,
      default:
        "Giảm 30% toàn bộ hóa đơn trong 3 ngày đầu tiên\nTặng voucher 200.000đ cho 50 khách đầu tiên mỗi ngày",
      hint: "Mỗi dòng một ưu đãi.",
    },

    // ==================== HÌNH ẢNH ====================
    {
      key: "cover_photo",
      type: "image",
      label: "Ảnh bìa",
      group: "Hình ảnh",
      default: `${ASSETS}/cover.svg`,
    },
    {
      key: "gallery",
      type: "gallery",
      label: "Hình ảnh không gian (tối đa 4)",
      group: "Hình ảnh",
      max: 4,
      default: [
        `${ASSETS}/gallery-1.svg`,
        `${ASSETS}/gallery-2.svg`,
        `${ASSETS}/gallery-3.svg`,
        `${ASSETS}/gallery-4.svg`,
      ],
    },

    // ==================== CẢM ƠN ====================
    {
      key: "thank_you",
      type: "textarea",
      label: "Lời cảm ơn",
      group: "Cảm ơn",
      rows: 3,
      default:
        "Sự hiện diện của quý khách là khởi đầu may mắn nhất cho hành trình mới của chúng tôi.\nTrân trọng cảm ơn và hẹn gặp tại buổi lễ!",
    },
  ],

  palettes: [
    {
      name: "Đỏ may mắn",
      colors: {
        primary: "#b3282d",
        accent: "#c9973f",
        bg: "#fdf6f0",
        surface: "#fffdf9",
        text: "#3d2422",
        muted: "#a58179",
      },
    },
    {
      name: "Vàng đồng sang trọng",
      colors: {
        primary: "#a07a3b",
        accent: "#5c4a2f",
        bg: "#faf7f1",
        surface: "#ffffff",
        text: "#3a3226",
        muted: "#a2937b",
      },
    },
    {
      name: "Xanh thương hiệu",
      colors: {
        primary: "#1f6e8c",
        accent: "#c9973f",
        bg: "#f2f8fa",
        surface: "#ffffff",
        text: "#243842",
        muted: "#7d99a5",
      },
    },
  ],

  fonts: HEADING_FONT_OPTIONS,

  defaultStyle: {
    palette: 0,
    heading_font: "playfair",
    body_font: DEFAULT_BODY_FONT,
    scale: DEFAULT_SCALE,
  },
};
