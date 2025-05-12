export type IResponse<T> = {
  statuscode: number;
  success: boolean;
  message: string;
  data: T | null | undefined;
  meta?: IMeta;
};

type IMeta = {
  page: number;
  limit: number;
  total: number;
};
