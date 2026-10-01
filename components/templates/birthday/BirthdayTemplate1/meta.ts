import type { TemplateMeta } from "@/components/templates/types";
import {
  DEFAULT_BODY_FONT,
  DEFAULT_SCALE,
  HEADING_FONT_OPTIONS,
} from "@/components/templates/style-options";

const ASSETS = "/templates/birthday/1";

export const birthdayTemplate1Meta: TemplateMeta = {
  key: "BirthdayTemplate1",
  name: "Tiệc Sinh Nhật Rộn Ràng",
  category: "birthday",
  description:
    "Thiệp mời sinh nhật tươi vui với bóng bay, confetti, đếm ngược tới giờ tiệc, album ảnh và bản đồ tới địa điểm.",
  thumbnail: `${ASSETS}/cover.svg`,

  fields: [
    // ==================== NHÂN VẬT CHÍNH ====================
    {
      key: "celebrant_name",
      type: "text",
      label: "Tên nhân vật chính",
      group: "Nhân vật chính",
      default: "Gia Hân",
      maxLength: 40,
    },
    {
      key: "age",
      type: "text",
      label: "Tuổi",
      group: "Nhân vật chính",
      optional: true,
      default: "5",
      maxLength: 3,
      hint: "Bỏ trống nếu không muốn hiển thị tuổi.",
    },

    // ==================== BỮA TIỆC ====================
    {
      key: "party_name",
      type: "text",
      label: "Tên bữa tiệc",
      group: "Bữa tiệc",
      default: "TIỆC SINH NHẬT",
      maxLength: 60,
    },
    {
      key: "date_time",
      type: "datetime",
      label: "Thời gian",
      group: "Bữa tiệc",
      default: "2026-09-20T17:00",
    },
    {
      key: "dress_code",
      type: "text",
      label: "Dress code",
      group: "Bữa tiệc",
      optional: true,
      default: "",
      placeholder: "VD: Dress code — tông pastel",
    },
    {
      key: "venue_name",
      type: "text",
      label: "Địa điểm",
      group: "Bữa tiệc",
      default: "Kidzone Party House",
      maxLength: 80,
    },
    {
      key: "venue_address",
      type: "textarea",
      label: "Địa chỉ",
      group: "Bữa tiệc",
      rows: 2,
      default: "12 Phan Xích Long, Quận Phú Nhuận, TP. Hồ Chí Minh",
    },

    // ==================== LỜI MỜI ====================
    {
      key: "opening_letter",
      type: "textarea",
      label: "Lời nhắn",
      group: "Lời mời",
      rows: 4,
      default:
        "Lại thêm một tuổi mới rồi!\nBố mẹ và Gia Hân muốn dành một buổi chiều thật vui,\nthật nhiều bánh kem và tiếng cười — cùng với bạn.",
    },
    {
      key: "invitation",
      type: "textarea",
      label: "Lời mời",
      group: "Lời mời",
      rows: 2,
      default: "Đến chung vui với tụi mình nhé, có mặt là có quà!",
    },

    // ==================== ALBUM ẢNH ====================
    {
      key: "cover_photo",
      type: "image",
      label: "Ảnh bìa",
      group: "Album ảnh",
      default: `${ASSETS}/cover.svg`,
    },
    {
      key: "gallery",
      type: "gallery",
      label: "Album ảnh (tối đa 4)",
      group: "Album ảnh",
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
        "Cảm ơn bạn đã luôn yêu thương Gia Hân.\nHẹn gặp bạn ở bữa tiệc — nhớ đói bụng một chút nha!",
    },
  ],

  palettes: [
    {
      name: "Hồng kẹo ngọt",
      colors: {
        primary: "#d96896",
        accent: "#8a5fae",
        bg: "#fdf5f8",
        surface: "#ffffff",
        text: "#4a3340",
        muted: "#ad8a9b",
      },
    },
    {
      name: "Xanh mint",
      colors: {
        primary: "#2f9e94",
        accent: "#e8964b",
        bg: "#f1faf8",
        surface: "#ffffff",
        text: "#2b423e",
        muted: "#7fa39d",
      },
    },
    {
      name: "Vàng nắng",
      colors: {
        primary: "#d99a2b",
        accent: "#d96896",
        bg: "#fffaf0",
        surface: "#ffffff",
        text: "#4a3d28",
        muted: "#ab9877",
      },
    },
  ],

  fonts: HEADING_FONT_OPTIONS,

  defaultStyle: {
    palette: 0,
    heading_font: "quicksand",
    body_font: DEFAULT_BODY_FONT,
    scale: DEFAULT_SCALE,
  },
};
