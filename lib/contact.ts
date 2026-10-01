/** Thông tin liên hệ của đội vận hành — nơi duy nhất khai báo, footer và nút "Liên hệ đặt thiệp" đều lấy từ đây. */
export const CONTACT = {
  /** Số điện thoại / Zalo. */
  phone: "0969405887",
  /** Người thực hiện / thiết kế. */
  author: "Kieu Thanh The Anh",
} as const;

/** Link gọi điện (dùng được trên điện thoại). */
export const CONTACT_TEL_URL = `tel:${CONTACT.phone}`;

/** Link mở Zalo tới đúng số liên hệ. */
export const CONTACT_ZALO_URL = `https://zalo.me/${CONTACT.phone}`;
