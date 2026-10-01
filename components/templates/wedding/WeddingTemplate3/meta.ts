import { makeWeddingMeta } from "../kit/meta";

export const weddingTemplate3Meta = makeWeddingMeta({
  key: "WeddingTemplate3",
  name: "Hòm Thư Yêu Thương",
  description:
    "Bìa hai ảnh dán chéo, hòm thư dựng cờ và bay thư mời, ảnh rải kiểu scrapbook, bộ bài ảnh chạm để lật, lịch trên nền đen trắng.",
  thumbnail: "/templates/wedding/3/thumb.jpg",
  headingFont: "playfair",
  palettes: [
    {
      name: "Hồng đào",
      colors: {
        primary: "#c9707e",
        accent: "#d9954a",
        bg: "#fff7f4",
        surface: "#ffffff",
        text: "#4a3238",
        muted: "#a58a90",
      },
    },
    {
      name: "Xanh bạc hà",
      colors: {
        primary: "#4f9a8f",
        accent: "#e08f6e",
        bg: "#f3faf8",
        surface: "#ffffff",
        text: "#27403c",
        muted: "#7fa59d",
      },
    },
    {
      name: "Tím lavender",
      colors: {
        primary: "#8a74b5",
        accent: "#d18aa8",
        bg: "#f8f5fc",
        surface: "#ffffff",
        text: "#372f4a",
        muted: "#9a8fb0",
      },
    },
  ],
});
