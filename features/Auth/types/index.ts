export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RefreshTokenPayload {
  access_token: string;
}

export interface AuthTokens {
  access_token: string;
  expires_in: number;
}
