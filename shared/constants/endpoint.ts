/** Base URL của BE (IC.API). Cấu hình qua .env.local. */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5216';

/**
 * Nơi khai báo tập trung mọi endpoint của app.
 * Service không tự viết path chuỗi rời rạc — luôn lấy từ đây.
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REFRESH: '/api/auth/refresh',
  },
  INVITATION: {
    BY_SLUG: (slug: string) => `/api/events/${slug}`,
  },
} as const;
