// success response
export interface DtoSuccessResponse<T> {
  code: '2000' | string;
  data: T;
  message: null | string;
  page?: { count: number; pageNumber: number; pageSize: number; totalPage: number };
}

// picture response
export interface DtoPicture {}
