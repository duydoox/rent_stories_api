export interface Response<T> {
  data: T | null;
  success: boolean;
  status: number;
  message?: string;
}

export interface IInfo {
  sub: string;
  username: string;
}
