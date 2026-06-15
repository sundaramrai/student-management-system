export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface PaginationQuery {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface StudentFilters {
  search?: string;
  course?: string;
  gender?: Gender;
  year?: number;
}

export interface CreateStudentData {
  name: string;
  course: string;
  year: number;
  dateOfBirth: Date;
  email: string;
  mobileNumber: string;
  gender: Gender;
  address: string;
  photoUrl?: string;
}

export interface UpdateStudentData {
  name?: string;
  course?: string;
  year?: number;
  dateOfBirth?: Date;
  email?: string;
  mobileNumber?: string;
  gender?: Gender;
  address?: string;
  photoUrl?: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
