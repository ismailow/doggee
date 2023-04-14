export interface ApiSuccesResponse<T> {
  data: T;
  success: true;
}

export interface ApiFailureResponse {
  data: { message: string };
  success: false;
}

export type ApiResponse<T> = ApiSuccesResponse<T> | ApiFailureResponse;
