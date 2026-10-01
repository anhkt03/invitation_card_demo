import { AUTH_CONSTANTS } from '../constants';

/** Tên query param mang đường dẫn cần quay lại sau khi đăng nhập. */
export const NEXT_PARAM = 'next';

/**
 * Chỉ chấp nhận đường dẫn nội bộ, chặn open redirect.
 * Trả về null nếu giá trị không an toàn hoặc vô nghĩa:
 *  - `https://evil.com`      — URL tuyệt đối
 *  - `//evil.com`            — protocol-relative
 *  - `/\evil.com`            — một số browser coi `\` như `/`
 *  - chính trang login       — sẽ tạo vòng lặp
 */
export function sanitizeReturnUrl(raw: string | null | undefined): string | null {
  if (!raw || !raw.startsWith('/')) return null;
  if (raw.startsWith('//') || raw.startsWith('/\\')) return null;

  const { LOGIN } = AUTH_CONSTANTS.ROUTES;
  if (raw === LOGIN || raw.startsWith(`${LOGIN}?`) || raw.startsWith(`${LOGIN}/`)) return null;

  return raw;
}

/** Đường dẫn đang xem (kèm query) — chỉ gọi được ở phía client. */
export function currentPathWithQuery(): string {
  return `${window.location.pathname}${window.location.search}`;
}

/** Dựng URL trang login có đính kèm chỗ cần quay lại. */
export function buildLoginUrl(returnTo: string | null | undefined): string {
  const safe = sanitizeReturnUrl(returnTo);
  const { LOGIN } = AUTH_CONSTANTS.ROUTES;

  return safe ? `${LOGIN}?${NEXT_PARAM}=${encodeURIComponent(safe)}` : LOGIN;
}
