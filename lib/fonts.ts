import {
  Be_Vietnam_Pro,
  Cormorant_Garamond,
  Dancing_Script,
  Great_Vibes,
  Playfair_Display,
  Quicksand,
} from "next/font/google";

// Toàn bộ font đều phải có subset "vietnamese" — font script thiếu subset này
// sẽ vỡ dấu với tên riêng tiếng Việt ("Nguyễn", "Trần"...).

export const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const dancing = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  variable: "--font-dancing",
  display: "swap",
});

export const greatVibes = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"],
  variable: "--font-quicksand",
  display: "swap",
});

/** Gắn vào <html> để mọi trang (kể cả preview template) dùng được biến font. */
export const fontVariables = [
  beVietnam.variable,
  playfair.variable,
  cormorant.variable,
  dancing.variable,
  greatVibes.variable,
  quicksand.variable,
].join(" ");
