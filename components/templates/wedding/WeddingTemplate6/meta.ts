import { makeWeddingMeta } from "../kit/meta";

export const weddingTemplate6Meta = makeWeddingMeta({
  key: "WeddingTemplate6",
  name: "Dạ Tiệc Đêm",
  description:
    "Nền tối sang trọng ánh vàng: bìa ba dải ảnh cánh hoa rơi, phong thư mở, ảnh tròn trượt vào giữa, coverflow 3D, hai dải ảnh chạy ngược chiều.",
  thumbnail: "/templates/wedding/6/thumb.jpg",
  headingFont: "cormorant",
  palettes: [
    {
      name: "Navy & vàng",
      colors: {
        primary: "#d6b673",
        accent: "#e9d3a0",
        bg: "#0f1a2c",
        surface: "#17263d",
        text: "#f1e9d8",
        muted: "#9fb0c6",
      },
    },
    {
      name: "Đen & vàng hồng",
      colors: {
        primary: "#e2b7a1",
        accent: "#f0d4c4",
        bg: "#141214",
        surface: "#201c20",
        text: "#f4ebe6",
        muted: "#b3a2a6",
      },
    },
    {
      name: "Xanh rêu đậm",
      colors: {
        primary: "#cdb77a",
        accent: "#e6d9ae",
        bg: "#10201b",
        surface: "#183028",
        text: "#eee9d8",
        muted: "#9bb3a8",
      },
    },
  ],
});
