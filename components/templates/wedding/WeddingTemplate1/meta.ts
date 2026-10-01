import type { TemplateMeta } from "@/components/templates/types";
import {
  DEFAULT_BODY_FONT,
  DEFAULT_SCALE,
  HEADING_FONT_OPTIONS,
} from "@/components/templates/style-options";

const ASSETS = "/templates/wedding/1";

export const weddingTemplate1Meta: TemplateMeta = {
  key: "WeddingTemplate1",
  name: "Ngày Chung Đôi",
  category: "wedding",
  description:
    "Thiệp cưới thanh lịch tông pastel: thư ngỏ, đếm ngược, album ảnh, chuyện tình yêu, bản đồ và hộp mừng cưới.",
  thumbnail: `${ASSETS}/cover.svg`,

  fields: [
    // ==================== CÔ DÂU & CHÚ RỂ ====================
    {
      key: "groom_name",
      type: "text",
      label: "Tên chú rể",
      group: "Cô dâu & Chú rể",
      default: "Minh Quân",
      maxLength: 40,
    },
    {
      key: "bride_name",
      type: "text",
      label: "Tên cô dâu",
      group: "Cô dâu & Chú rể",
      default: "Thu Hà",
      maxLength: 40,
    },
    {
      key: "groom_parents",
      type: "textarea",
      label: "Nhà trai",
      group: "Cô dâu & Chú rể",
      rows: 2,
      default: "Ông Trần Văn Bình\nBà Lê Thị Mai",
      hint: "Mỗi dòng một người.",
    },
    {
      key: "bride_parents",
      type: "textarea",
      label: "Nhà gái",
      group: "Cô dâu & Chú rể",
      rows: 2,
      default: "Ông Nguyễn Đức Long\nBà Phạm Thu Hằng",
    },

    // ==================== SỰ KIỆN ====================
    {
      key: "ceremony_name",
      type: "text",
      label: "Tên buổi lễ",
      group: "Sự kiện",
      default: "LỄ THÀNH HÔN",
      maxLength: 60,
    },
    {
      key: "date_time",
      type: "datetime",
      label: "Thời gian",
      group: "Sự kiện",
      default: "2026-12-20T11:00",
    },
    {
      key: "lunar_date",
      type: "text",
      label: "Ngày âm lịch",
      group: "Sự kiện",
      optional: true,
      default: "",
      placeholder: "VD: Nhằm ngày 12 tháng 11 năm Bính Ngọ",
      hint: "Hiển thị dưới ngày dương lịch nếu điền.",
    },
    {
      key: "venue_name",
      type: "text",
      label: "Địa điểm",
      group: "Sự kiện",
      default: "Trung tâm Hội nghị Diamond Palace",
      maxLength: 80,
    },
    {
      key: "venue_address",
      type: "textarea",
      label: "Địa chỉ",
      group: "Sự kiện",
      rows: 2,
      default: "45 Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
    },

    // ==================== LỜI NGỎ & CÂU CHUYỆN ====================
    {
      key: "opening_letter",
      type: "textarea",
      label: "Thư ngỏ",
      group: "Lời ngỏ & Câu chuyện",
      rows: 4,
      default:
        "Có một ngày đặc biệt như thế —\nngày chúng mình chính thức về chung một nhà.\nHạnh phúc sẽ trọn vẹn hơn khi có bạn chứng kiến và chung vui.",
    },
    {
      key: "invitation",
      type: "textarea",
      label: "Lời mời",
      group: "Lời ngỏ & Câu chuyện",
      rows: 2,
      default:
        "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
    },
    {
      key: "story_milestones",
      type: "textarea",
      label: "Chuyện tình yêu",
      group: "Lời ngỏ & Câu chuyện",
      rows: 4,
      optional: true,
      default:
        "2019 — Lần đầu gặp gỡ dưới sân trường đại học\n2023 — Lời cầu hôn bên bờ biển Đà Nẵng\n2026 — Chúng mình cưới!",
      hint: "Mỗi dòng một mốc, dạng: Năm — nội dung.",
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
      label: "Album ảnh cưới (tối đa 6)",
      group: "Album ảnh",
      max: 6,
      default: [
        `${ASSETS}/gallery-1.svg`,
        `${ASSETS}/gallery-2.svg`,
        `${ASSETS}/gallery-3.svg`,
        `${ASSETS}/gallery-4.svg`,
        `${ASSETS}/gallery-5.svg`,
        `${ASSETS}/gallery-6.svg`,
      ],
    },

    // ==================== MỪNG CƯỚI & CẢM ƠN ====================
    {
      key: "qr_image",
      type: "image",
      label: "Ảnh QR mừng cưới",
      group: "Mừng cưới & Cảm ơn",
      optional: true,
      default: `${ASSETS}/qr-placeholder.svg`,
      hint: "Ảnh QR ngân hàng của cô dâu chú rể — chỉ hiển thị trên thiệp.",
    },
    {
      key: "qr_note",
      type: "text",
      label: "Thông tin chuyển khoản",
      group: "Mừng cưới & Cảm ơn",
      optional: true,
      default: "ACB · 123 456 789 · TRAN MINH QUAN",
    },
    {
      key: "thank_you",
      type: "textarea",
      label: "Lời cảm ơn",
      group: "Mừng cưới & Cảm ơn",
      rows: 3,
      default:
        "Cảm ơn bạn đã dành thời gian quý báu chung vui cùng gia đình chúng mình.\nSự hiện diện của bạn là món quà ý nghĩa nhất!",
    },
  ],

  palettes: [
    {
      name: "Hồng pastel",
      colors: {
        primary: "#b76e79",
        accent: "#8c4a55",
        bg: "#fdf8f5",
        surface: "#ffffff",
        text: "#43333a",
        muted: "#9b8088",
      },
    },
    {
      name: "Xanh sage",
      colors: {
        primary: "#6b8f71",
        accent: "#43604b",
        bg: "#f6f8f4",
        surface: "#ffffff",
        text: "#2f3b32",
        muted: "#84987f",
      },
    },
    {
      name: "Đỏ đô cổ điển",
      colors: {
        primary: "#8d3548",
        accent: "#b08d57",
        bg: "#fbf6ef",
        surface: "#fffdf9",
        text: "#3d2630",
        muted: "#a08691",
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
