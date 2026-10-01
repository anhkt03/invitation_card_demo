import { ENDPOINTS } from '@/shared/constants';
import { registerAuthHooks } from '@/shared/lib/api';
import { authService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../constants';
import { authStorage } from './authStorage';
import { buildLoginUrl, currentPathWithQuery } from './returnUrl';

/**
 * Refresh đang chạy dở. Khi nhiều request cùng dính 401 một lúc, tất cả chờ chung
 * promise này thay vì mỗi request gọi refresh một lần (sẽ làm BE xoay vòng refresh token
 * và các request sau nhận token đã bị thay).
 */
let inFlightRefresh: Promise<void> | null = null;

function refreshOnce(): Promise<void> {
  inFlightRefresh ??= (async () => {
    const accessToken = authStorage.getAccessToken();
    if (!accessToken) {
      throw new Error('No access token available for refresh');
    }

    const tokens = await authService.refresh({
      access_token: accessToken,
    });

    authStorage.save(tokens);
  })().finally(() => {
    inFlightRefresh = null;
  });

  return inFlightRefresh;
}

/**
 * Nối tầng auth vào axiosClient: tự gắn Bearer token, và khi gặp 401 thì refresh
 * rồi chạy lại request gốc. Gọi một lần lúc app khởi động (xem app/providers.tsx).
 */
/** 401 từ chính các endpoint này là "sai thông tin đăng nhập", không phải "token hết hạn". */
const AUTH_ENDPOINTS: readonly string[] = [ENDPOINTS.AUTH.LOGIN, ENDPOINTS.AUTH.REFRESH];

export function setupAuthInterceptor() {
  registerAuthHooks({
    getAccessToken: () => authStorage.getAccessToken(),
    refreshTokens: refreshOnce,
    shouldAttemptRefresh: (url) =>
      !AUTH_ENDPOINTS.includes(url ?? '') && authStorage.getAccessToken() !== null,
    onRefreshFailed: () => {
      authStorage.clear();

      if (typeof window === 'undefined') return;
      if (window.location.pathname === AUTH_CONSTANTS.ROUTES.LOGIN) return;

      window.location.replace(buildLoginUrl(currentPathWithQuery()));
    },
  });
}

/**
 * Gỡ tầng auth khỏi axiosClient. Bắt buộc gọi khi rời khỏi khu vực admin:
 * axiosClient dùng chung cho cả app, để nguyên thì trang public cũng bị gắn Bearer
 * và bị đá về /login khi API trả 401.
 */
export function teardownAuthInterceptor() {
  registerAuthHooks(null);
}

/** Dùng lại cho hook, để chỉ có đúng một chỗ biết cách refresh. */
export { refreshOnce };
