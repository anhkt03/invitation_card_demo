export interface ApiResponse<T = null> {
  success: boolean;
  status_code: number;
  message: string;
  data: T | null;
  errors?: string[] | null;
}
