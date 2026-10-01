'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from '@heroui/react';
import { ApiError } from '@/shared/lib/api';
import { authService } from '../services/auth.service';
import { refreshOnce } from '../utils/authInterceptor';
import { authStorage } from '../utils/authStorage';
import { NEXT_PARAM, sanitizeReturnUrl } from '../utils/returnUrl';
import { AUTH_CONSTANTS } from '../constants';
import { LoginCredentials } from '../types';

/**
 * Chứa toàn bộ logic auth: gọi service, lưu token, điều hướng, báo lỗi.
 * Component chỉ giữ state của form và gọi các hàm ở đây.
 */
export const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  /** Trả về true nếu đăng nhập thành công, để component tự quyết định làm gì thêm. */
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);

    try {
      const tokens = await authService.login(credentials);
      authStorage.save(tokens);

      // Quay lại trang đã bị chặn (?next=...), không có thì về dashboard.
      const returnTo = sanitizeReturnUrl(searchParams.get(NEXT_PARAM));
      router.push(returnTo ?? AUTH_CONSTANTS.ROUTES.AFTER_LOGIN);
      return true;
    } catch (err) {
      // ApiError giữ nguyên message tiếng Việt do BE trả về (vd. "Sai mật khẩu.").
      toast.danger(
        err instanceof ApiError ? err.displayMessage : AUTH_CONSTANTS.MESSAGES.LOGIN_FAILED,
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh thủ công. Bình thường không cần gọi — interceptor đã tự refresh khi gặp 401.
   * Dùng chung `refreshOnce` nên nếu đang có refresh chạy dở thì chờ chung, không gọi API hai lần.
   */
  const refresh = () => refreshOnce();

  /** Đăng xuất chủ động — về thẳng trang login, không giữ `next`. */
  const logout = () => {
    authStorage.clear();
    router.replace(AUTH_CONSTANTS.ROUTES.LOGIN);
  };

  return { login, refresh, logout, isLoading };
};
