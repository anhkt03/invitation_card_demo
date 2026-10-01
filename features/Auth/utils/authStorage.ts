import { AUTH_CONSTANTS } from '../constants';
import { AuthTokens } from '../types';

const { ACCESS_TOKEN, EXPIRES_AT } = AUTH_CONSTANTS.STORAGE_KEYS;

/**
 * Chỉ lưu access token phía client bằng localStorage. Refresh token được giữ
 * trong HttpOnly cookie nên JavaScript không thể đọc được.
 * Mọi hàm đều no-op khi chạy trên server (SSR không có localStorage).
 */
export const authStorage = {
  save(tokens: AuthTokens): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(EXPIRES_AT, String(Date.now() + tokens.expires_in * 1000));
  },

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN);
  },

  isExpired(): boolean {
    if (typeof window === 'undefined') return true;
    const expiresAt = localStorage.getItem(EXPIRES_AT);
    return !expiresAt || Number(expiresAt) <= Date.now();
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    [ACCESS_TOKEN, EXPIRES_AT].forEach((key) => localStorage.removeItem(key));
  },
};
