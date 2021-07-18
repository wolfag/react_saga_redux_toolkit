export interface IPaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface IListResponse<T> {
  data: T[],
  pagination: IPaginationParams;
}

export type TOrder = 'asc' | 'desc'

export interface IListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: TOrder;

  [key: string]: any;
}