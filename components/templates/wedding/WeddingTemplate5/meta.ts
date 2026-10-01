import { makeWeddingMeta } from "../kit/meta";

export const weddingTemplate5Meta = makeWeddingMeta({
  key: "WeddingTemplate5",
  name: "Vườn Xanh Tối Giản",
  description:
    "Phong cách tối giản tông xanh: ảnh bìa tròn có vòng xoay chậm, ảnh oval trượt vào giữa, mosaic bất đối xứng, slideshow ảnh mờ chéo và hộp mừng cưới.",
  thumbnail: "/templates/wedding/5/thumb.jpg",
  headingFont: "playfair",
  palettes: [
    {
      name: "Xanh sage",
      colors: {
        primary: "#5f7f68",
        accent: "#b08a5a",
        bg: "#f5f7f1",
        surface: "#ffffff",
        text: "#2b3a30",
        muted: "#87997f",
      },
    },
    {
      name: "Xanh olive",
      colors: {
        primary: "#6d7436",
        accent: "#b5654a",
        bg: "#f7f5ea",
        surface: "#fffef8",
        text: "#34331f",
        muted: "#8e8d63",
      },
    },
    {
      name: "Be & nâu",
      colors: {
        primary: "#8a6a4a",
        accent: "#6b8a70",
        bg: "#f8f3ec",
        surface: "#fffdf9",
        text: "#3a2f26",
        muted: "#9d8a76",
      },
    },
  ],
});
