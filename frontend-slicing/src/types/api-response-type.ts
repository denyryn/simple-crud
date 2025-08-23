export type ApiResponse<T> = {
  data?: T;
  status: "success" | "error";
  code: number;
  message?: string;
  errors?: Record<string, string[]>;
};
