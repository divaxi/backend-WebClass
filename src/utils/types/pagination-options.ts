export interface IPaginationOptions<T = Record<string, any>> {
  page: number;
  limit: number;
  search?: T;
}
