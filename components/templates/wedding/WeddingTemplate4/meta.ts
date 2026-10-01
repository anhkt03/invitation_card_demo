import { makeWeddingMeta } from "../kit/meta";

export const weddingTemplate4Meta = makeWeddingMeta({
  key: "WeddingTemplate4",
  name: "Song Hỷ Rèm Đỏ",
  description:
    "Màn bìa rèm nhung đỏ viền vàng kéo ra hai bên, khung ảnh viền cổ điển, tam liên ba ảnh, dải ảnh tràn lề có chữ và ảnh cảm ơn toàn khung.",
  thumbnail: "/templates/wedding/4/thumb.jpg",
  headingFont: "cormorant",
  palettes: [
    {
      name: "Đỏ & vàng",
      colors: {
        primary: "#9e1f2e",
        accent: "#c9a24b",
        bg: "#fbf3e8",
        surface: "#fffaf1",
        text: "#3a1f1f",
        muted: "#8a6a5a",
      },
    },
    {
      name: "Đỏ mận",
      colors: {
        primary: "#7a1f3d",
        accent: "#d1a054",
        bg: "#faf1ee",
        surface: "#fff8f4",
        text: "#3a1f2a",
        muted: "#8f6f78",
      },
    },
    {
      name: "Xanh ngọc & vàng",
      colors: {
        primary: "#1f5c58",
        accent: "#c9a24b",
        bg: "#f3f7f3",
        surface: "#fbfdfa",
        text: "#1f3532",
        muted: "#6f8a85",
      },
    },
  ],
});
