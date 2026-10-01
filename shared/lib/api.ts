import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/shared/constants';
import { ApiResponse } from '@/shared/types';

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errors: string[] | null;

  constructor(statusCode: number, message: string, errors: string[] | null = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }

  /** Gộp message + errors thành một chuỗi để hiển thị. */
  get displayMessage(): string {
    return this.errors?.length ? this.errors.join(', ') : this.message;
  }
}
export interface AuthHooks {
  getAccessToken: () => string | null;
  /**
   * Request này gặp 401 thì có nên thử refresh không.
   * Phải trả false cho chính các endpoint auth (login/refresh) và khi chưa có refresh token —
   * nếu không, sai mật khẩu cũng bị hiểu nhầm là hết hạn session.
   */
  shouldAttemptRefresh: (url: string | undefined) => boolean;
  refreshTokens: () => Promise<void>;
  onRefreshFailed?: () => void;
}

let authHooks: AuthHooks | null = null;

export function registerAuthHooks(hooks: AuthHooks | null) {
  authHooks = hooks;
}

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

// ==================== REQUEST: gắn Bearer token ====================
axiosClient.interceptors.request.use((config) => {
  const token = authHooks?.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !config ||
      config._retried ||
      !authHooks ||
      !authHooks.shouldAttemptRefresh(config.url)
    ) {
      throw error;
    }

    config._retried = true;

    try {
      await authHooks.refreshTokens();
    } catch {
      authHooks.onRefreshFailed?.();
      throw error;
    }

    return axiosClient.request(config);
  },
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error instanceof ApiError) {
      throw error;
    }

    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    const body = axiosError.response?.data;

    throw new ApiError(
      body?.status_code ?? axiosError.response?.status ?? 0,
      body?.message ?? axiosError.message,
      body?.errors ?? null,
    );
  },
);

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  const { data: body } = await axiosClient.request<ApiResponse<T>>(config);

  if (!body?.success) {
    throw new ApiError(
      body?.status_code ?? 0,
      body?.message ?? 'Request failed',
      body?.errors ?? null,
    );
  }

  return body.data as T;
}
