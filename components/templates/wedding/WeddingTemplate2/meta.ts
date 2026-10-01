import { makeWeddingMeta } from "../kit/meta";

export const weddingTemplate2Meta = makeWeddingMeta({
  key: "WeddingTemplate2",
  name: "Thư Mời Hạnh Phúc",
  description:
    "Bìa ảnh Ken Burns, phong thư mở bằng con dấu sáp, hai ảnh cô dâu chú rể trượt vào giữa, album vuốt ngang và hộp mừng cưới mở nắp.",
  thumbnail: "/templates/wedding/2/thumb.jpg",
  headingFont: "cormorant",
  palettes: [
    {
      name: "Kem & vàng đồng",
      colors: {
        primary: "#9a7448",
        accent: "#b4636c",
        bg: "#fbf7f0",
        surface: "#fffdf9",
        text: "#3a2f27",
        muted: "#9a8a77",
      },
    },
    {
      name: "Hồng phấn",
      colors: {
        primary: "#b9707c",
        accent: "#8f4c58",
        bg: "#fdf6f4",
        surface: "#ffffff",
        text: "#43333a",
        muted: "#a08a90",
      },
    },
    {
      name: "Xanh sage",
      colors: {
        primary: "#6a8a70",
        accent: "#9a7448",
        bg: "#f6f8f3",
        surface: "#ffffff",
        text: "#2f3b32",
        muted: "#85987f",
      },
    },
  ],
});
