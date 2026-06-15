export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface Student {
  id: string;
  admissionNumber: string;
  name: string;
  course: string;
  year: number;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  gender: Gender;
  address: string;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  studentId: string;
  action: string;
  createdAt: string;
  student: {
    name: string;
    admissionNumber: string;
  };
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
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

export interface StudentFilters {
  search?: string;
  course?: string;
  gender?: Gender;
  year?: number;
  page?: number;
  pageSize?: number;
}

export interface CreateStudentPayload {
  name: string;
  course: string;
  year: number;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  gender: Gender;
  address: string;
  photo?: File;
}

export type UpdateStudentPayload = Partial<CreateStudentPayload>;
