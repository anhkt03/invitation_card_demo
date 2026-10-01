import { ENDPOINTS } from '@/shared/constants';
import { apiRequest } from '@/shared/lib/api';
import { AuthTokens, LoginCredentials, RefreshTokenPayload } from '../types';

/**
 * Chỉ gọi API, không xử lý logic.
 * Lưu token / redirect / báo lỗi đều nằm ở hook (xem hooks/useAuth.ts).
 */
export const authService = {
  login: (credentials: LoginCredentials) =>
    apiRequest<AuthTokens>({
      method: 'POST',
      url: ENDPOINTS.AUTH.LOGIN,
      data: credentials,
    }),

  refresh: (payload: RefreshTokenPayload) =>
    apiRequest<AuthTokens>({
      method: 'POST',
      url: ENDPOINTS.AUTH.REFRESH,
      data: payload,
    }),
};
