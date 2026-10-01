import type { FieldDef, TemplateData } from "@/components/templates/types";
import sample from "./sample.json";

/**
 * Schema dữ liệu CHUNG cho các mẫu thiệp cưới lắp từ kit (WeddingTemplate2…):
 * một bộ key JSON phẳng (snake_case) — người tạo thiệp gửi một file JSON theo bộ key này
 * thì đổi sang mẫu nào cũng được. Key nào thiếu/để trống thì phần tương ứng của thiệp
 * tự ẩn, không rơi về nội dung mẫu.
 *
 * Giá trị:  chuỗi  ·  ảnh = đường dẫn hoặc URL (https://…)  ·  gallery = mảng URL
 *           ngày giờ = "YYYY-MM-DDTHH:mm"  ·  danh sách nhiều dòng = chuỗi có "\n"
 *           toggle = "true" | "false"
 *
 * `default` của mỗi field lấy từ sample.json — đó là NGUỒN DUY NHẤT của dữ liệu mẫu.
 * (Chỉ label/hint/maxLength/required được phép lưu DB — xem ghi chú ở FieldDef.)
 */
export const WEDDING_SAMPLE = sample as TemplateData;

const str = (key: string): string => {
  const v = WEDDING_SAMPLE[key];
  return typeof v === "string" ? v : "";
};

type Extra = { required?: boolean; hint?: string; placeholder?: string };
const base = (key: string, label: string, group: string, e: Extra) => ({
  key,
  label,
  group,
  default: str(key),
  optional: !e.required,
  ...(e.hint ? { hint: e.hint } : null),
  ...(e.placeholder ? { placeholder: e.placeholder } : null),
});

const text = (key: string, label: string, group: string, maxLength: number, e: Extra = {}): FieldDef => ({
  ...base(key, label, group, e),
  type: "text",
  maxLength,
});

const area = (
  key: string,
  label: string,
  group: string,
  maxLength: number,
  rows = 2,
  e: Extra = {},
): FieldDef => ({ ...base(key, label, group, e), type: "textarea", rows, maxLength });

const image = (key: string, label: string, group: string, e: Extra = {}): FieldDef => ({
  ...base(key, label, group, e),
  type: "image",
});

const when = (key: string, label: string, group: string, e: Extra = {}): FieldDef => ({
  ...base(key, label, group, e),
  type: "datetime",
});

const G_COUPLE = "Cô dâu & Chú rể";
const G_LETTER = "Lời ngỏ";
const G_PROGRAM = "Chương trình";
const G_VENUE = "Địa điểm tiệc cưới";
const G_PHOTO = "Ảnh";
const G_STORY = "Chuyện tình yêu & Lưu bút";
const G_GIFT = "Mừng cưới";
const G_THANKS = "Cảm ơn";
const G_VIEW = "Chế độ xem";

export const WEDDING_FIELDS: FieldDef[] = [
  // ==================== CÔ DÂU & CHÚ RỂ ====================
  text("groom_name", "Tên chú rể", G_COUPLE, 40, { required: true }),
  text("bride_name", "Tên cô dâu", G_COUPLE, 40, { required: true }),
  {
    ...base("use_initials", "Dùng chữ cái đầu của tên", G_COUPLE, {
      hint: "Bật: con dấu sáp, monogram, huy hiệu hiện chữ cái đầu (vd K&H). Bỏ trống/tắt: không dùng.",
    }),
    type: "toggle",
    default: str("use_initials") === "true" ? "true" : "false",
  },
  image("groom_photo", "Ảnh chân dung chú rể", G_COUPLE, {
    hint: "Ảnh dọc tỉ lệ 3:4. Cùng với ảnh cô dâu tạo hiệu ứng hai ảnh trượt vào giữa.",
  }),
  image("bride_photo", "Ảnh chân dung cô dâu", G_COUPLE),
  text("groom_role", "Vai trò chú rể", G_COUPLE, 30, { hint: "VD: Trưởng nam" }),
  text("bride_role", "Vai trò cô dâu", G_COUPLE, 30, { hint: "VD: Trưởng nữ" }),
  area("groom_parents", "Nhà trai", G_COUPLE, 120, 2, { hint: "Mỗi dòng một người." }),
  area("groom_address", "Địa chỉ nhà trai", G_COUPLE, 120),
  area("bride_parents", "Nhà gái", G_COUPLE, 120, 2, { hint: "Mỗi dòng một người." }),
  area("bride_address", "Địa chỉ nhà gái", G_COUPLE, 120),

  // ==================== LỜI NGỎ ====================
  text("cover_quote", "Câu trích trên bìa", G_LETTER, 100),
  text("opening_quote", "Câu mở đầu", G_LETTER, 140),
  area("opening_letter", "Thư ngỏ", G_LETTER, 600, 4),
  area("invitation", "Lời mời", G_LETTER, 200),
  area("families_note", "Lời nhắn hai gia đình", G_LETTER, 200),
  text("calendar_note", "Câu dưới lịch", G_LETTER, 100),

  // ==================== CHƯƠNG TRÌNH ====================
  when("engagement_date_time", "Lễ đính hôn — thời gian", G_PROGRAM, {
    hint: "Bỏ trống để ẩn lễ đính hôn khỏi chương trình.",
  }),
  text("engagement_venue", "Lễ đính hôn — địa điểm", G_PROGRAM, 120),
  when("date_time", "Lễ thành hôn — thời gian", G_PROGRAM, { required: true }),
  text("lunar_date", "Ngày âm lịch", G_PROGRAM, 60, {
    placeholder: "VD: Nhằm ngày 11 tháng 11 năm Bính Ngọ",
  }),
  text("wedding_venue", "Lễ thành hôn — địa điểm", G_PROGRAM, 120),
  when("reception_date_time", "Tiệc cưới — thời gian", G_PROGRAM),
  text("reception_note", "Tiệc cưới — ghi chú", G_PROGRAM, 60),

  // ==================== ĐỊA ĐIỂM TIỆC CƯỚI ====================
  text("venue_name", "Tên trung tâm tiệc cưới", G_VENUE, 80),
  text("venue_hall", "Sảnh", G_VENUE, 40),
  area("venue_address", "Địa chỉ", G_VENUE, 200),
  text("map_url", "Link Google Maps", G_VENUE, 300, {
    hint: "Bỏ trống thì tự tạo link tìm kiếm từ tên và địa chỉ.",
  }),

  // ==================== ẢNH ====================
  image("cover_photo", "Ảnh bìa", G_PHOTO),
  image("background_photo", "Ảnh nền", G_PHOTO, {
    hint: "Dùng làm nền cho lịch, đếm ngược, câu trích. Bỏ trống thì dùng ảnh bìa.",
  }),
  image("thanks_photo", "Ảnh cảm ơn", G_PHOTO, {
    hint: "Hiện ở cuối thiệp. Bỏ trống thì dùng ảnh bìa.",
  }),
  {
    ...base("gallery", "Album ảnh cưới (tối đa 12)", G_PHOTO, {}),
    type: "gallery",
    max: 12,
    default: Array.isArray(WEDDING_SAMPLE.gallery) ? WEDDING_SAMPLE.gallery : [],
  },

  area("gallery_captions", "Chú thích cho album ảnh", G_PHOTO, 600, 4, {
    hint: "Mỗi dòng một chú thích, theo thứ tự ảnh trong album.",
  }),
  text("banner_words", "Dải chữ trên ảnh", G_PHOTO, 60, {
    hint: "Các từ cách nhau bằng dấu |, vd: FALL IN | LOVE | FOREVER",
  }),

  // ==================== CHUYỆN TÌNH YÊU & LƯU BÚT ====================
  area("story_milestones", "Chuyện tình yêu", G_STORY, 600, 4, {
    hint: "Mỗi dòng một mốc, dạng: Năm — nội dung.",
  }),
  area("wishes", "Lời chúc", G_STORY, 600, 4, {
    hint: "Mỗi dòng một lời chúc, dạng: Tên: nội dung.",
  }),

  // ==================== MỪNG CƯỚI ====================
  area("gift_note", "Lời nhắn mừng cưới", G_GIFT, 200),
  image("groom_qr_image", "Ảnh QR chú rể", G_GIFT),
  text("groom_account_name", "Chủ tài khoản (chú rể)", G_GIFT, 40),
  area("groom_bank", "Ngân hàng & số tài khoản (chú rể)", G_GIFT, 100),
  image("bride_qr_image", "Ảnh QR cô dâu", G_GIFT),
  text("bride_account_name", "Chủ tài khoản (cô dâu)", G_GIFT, 40),
  area("bride_bank", "Ngân hàng & số tài khoản (cô dâu)", G_GIFT, 100),

  // ==================== CẢM ƠN ====================
  area("thank_you", "Lời cảm ơn", G_THANKS, 300, 3),

  // ==================== CHẾ ĐỘ XEM ====================
  {
    ...base("auto_scroll", "Tự động cuộn cho khách xem", G_VIEW, {
      hint: "Thiệp tự trượt xuống; khách chạm hoặc cuộn tay thì dừng, có nút để tiếp tục.",
    }),
    type: "toggle",
    default: str("auto_scroll") === "true" ? "true" : "false",
  },
  {
    ...base("auto_scroll_speed", "Tốc độ tự cuộn", G_VIEW, {}),
    type: "select",
    options: [
      { value: "slow", label: "Chậm" },
      { value: "normal", label: "Vừa" },
      { value: "fast", label: "Nhanh" },
    ],
    default: str("auto_scroll_speed") || "normal",
  },
];
