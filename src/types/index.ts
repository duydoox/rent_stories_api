export type Response<T> = {
  data: T | null;
  success: boolean;
  status: number;
  message?: string;
};
