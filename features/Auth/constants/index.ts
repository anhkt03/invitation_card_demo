export const AUTH_CONSTANTS = {
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'ic_access_token',
    REFRESH_TOKEN: 'ic_refresh_token',
    EXPIRES_AT: 'ic_token_expires_at',
  },
  ROUTES: {
    LOGIN: '/login',
    AFTER_LOGIN: '/dashboard',
  },
  MESSAGES: {
    LOGIN_FAILED: 'Sign in failed. Please try again.',
  },
} as const;
