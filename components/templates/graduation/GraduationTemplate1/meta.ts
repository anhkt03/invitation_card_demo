import type { TemplateMeta } from "@/components/templates/types";
import {
  DEFAULT_BODY_FONT,
  DEFAULT_SCALE,
  HEADING_FONT_OPTIONS,
} from "@/components/templates/style-options";

const ASSETS = "/templates/graduation/1";

export const graduationTemplate1Meta: TemplateMeta = {
  key: "GraduationTemplate1",
  name: "Ngày Tốt Nghiệp",
  category: "graduation",
  description:
    "Thiệp mời lễ tốt nghiệp phong cách học viện: hành trình học tập, đếm ngược, album kỷ niệm và bản đồ tới hội trường.",
  thumbnail: `${ASSETS}/cover.svg`,

  fields: [
    // ==================== TÂN KHOA ====================
    {
      key: "graduate_name",
      type: "text",
      label: "Tên tân khoa",
      group: "Tân khoa",
      default: "Nguyễn Minh Anh",
      maxLength: 40,
    },
    {
      key: "degree",
      type: "text",
      label: "Bằng cấp / Ngành",
      group: "Tân khoa",
      default: "Cử nhân Công nghệ Thông tin",
      maxLength: 80,
    },
    {
      key: "school",
      type: "text",
      label: "Trường",
      group: "Tân khoa",
      default: "Trường Đại học Bách Khoa TP.HCM",
      maxLength: 100,
    },

    // ==================== SỰ KIỆN ====================
    {
      key: "ceremony_name",
      type: "text",
      label: "Tên buổi lễ",
      group: "Sự kiện",
      default: "LỄ TỐT NGHIỆP",
      maxLength: 60,
    },
    {
      key: "date_time",
      type: "datetime",
      label: "Thời gian",
      group: "Sự kiện",
      default: "2026-11-15T08:30",
    },
    {
      key: "event_note",
      type: "text",
      label: "Ghi chú",
      group: "Sự kiện",
      optional: true,
      default: "",
      placeholder: "VD: Có mặt trước 30 phút để nhận lễ phục",
    },
    {
      key: "venue_name",
      type: "text",
      label: "Địa điểm",
      group: "Sự kiện",
      default: "Hội trường A5 — Cơ sở Lý Thường Kiệt",
      maxLength: 80,
    },
    {
      key: "venue_address",
      type: "textarea",
      label: "Địa chỉ",
      group: "Sự kiện",
      rows: 2,
      default: "268 Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh",
    },

    // ==================== LỜI MỜI & HÀNH TRÌNH ====================
    {
      key: "opening_letter",
      type: "textarea",
      label: "Thư mời",
      group: "Lời mời & Hành trình",
      rows: 4,
      default:
        "Bốn năm thanh xuân gói lại trong một tấm bằng.\nMình rất mong có bạn trong khoảnh khắc đặc biệt này —\nngày mình chính thức tốt nghiệp!",
    },
    {
      key: "invitation",
      type: "textarea",
      label: "Lời mời",
      group: "Lời mời & Hành trình",
      rows: 2,
      default: "Sự hiện diện của bạn là niềm vui và vinh dự của mình!",
    },
    {
      key: "journey",
      type: "textarea",
      label: "Hành trình học tập",
      group: "Lời mời & Hành trình",
      rows: 4,
      optional: true,
      default:
        "2022 — Ngày đầu nhập học, bỡ ngỡ giảng đường\n2024 — Giải Nhì nghiên cứu khoa học cấp trường\n2026 — Bảo vệ khóa luận 9.5/10 và tốt nghiệp loại Giỏi",
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
      label: "Album kỷ niệm (tối đa 4)",
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
        "Cảm ơn gia đình, thầy cô và những người bạn đã đồng hành suốt chặng đường vừa qua.\nHẹn gặp nhau trong ngày vui này nhé!",
    },
  ],

  palettes: [
    {
      name: "Xanh học viện",
      colors: {
        primary: "#2f4d7e",
        accent: "#b08d57",
        bg: "#f5f7fa",
        surface: "#ffffff",
        text: "#26303f",
        muted: "#7d8a9e",
      },
    },
    {
      name: "Lục bảo",
      colors: {
        primary: "#2e6b52",
        accent: "#b08d57",
        bg: "#f3f8f5",
        surface: "#ffffff",
        text: "#26382f",
        muted: "#7f9689",
      },
    },
    {
      name: "Đỏ lễ phục",
      colors: {
        primary: "#8d3548",
        accent: "#b08d57",
        bg: "#faf5f2",
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
