import { apiClient, extractData, handleAxiosError } from "./api";
import {
  Student,
  PaginatedResult,
  StudentFilters,
  CreateStudentPayload,
  UpdateStudentPayload,
  ApiResponse,
} from "@/types";

const buildFormData = (
  payload: CreateStudentPayload | UpdateStudentPayload
): FormData => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "photo" && value instanceof File) {
      formData.append("photo", value);
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
};

export const studentService = {
  async getAll(
    filters: StudentFilters
  ): Promise<PaginatedResult<Student>> {
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== undefined && v !== "")
      );
      const { data } = await apiClient.get<ApiResponse<PaginatedResult<Student>>>(
        "/students",
        { params }
      );
      return extractData(data);
    } catch (err) {
      return handleAxiosError(err);
    }
  },

  async getById(id: string): Promise<Student> {
    try {
      const { data } = await apiClient.get<ApiResponse<Student>>(`/students/${id}`);
      return extractData(data);
    } catch (err) {
      return handleAxiosError(err);
    }
  },

  async create(payload: CreateStudentPayload): Promise<Student> {
    try {
      const formData = buildFormData(payload);
      const { data } = await apiClient.post<ApiResponse<Student>>(
        "/students",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return extractData(data);
    } catch (err) {
      return handleAxiosError(err);
    }
  },

  async update(id: string, payload: UpdateStudentPayload): Promise<Student> {
    try {
      const formData = buildFormData(payload);
      const { data } = await apiClient.put<ApiResponse<Student>>(
        `/students/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return extractData(data);
    } catch (err) {
      return handleAxiosError(err);
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/students/${id}`);
    } catch (err) {
      handleAxiosError(err);
    }
  },

  async getCourses(): Promise<string[]> {
    try {
      const { data } = await apiClient.get<ApiResponse<string[]>>(
        "/students/courses"
      );
      return extractData(data);
    } catch (err) {
      return handleAxiosError(err);
    }
  },
};
