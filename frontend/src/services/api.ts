import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types";

const BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

export const extractData = <T>(response: ApiResponse<T>): T => {
  if (!response.success) throw new Error(response.message);
  return response.data;
};

export const handleAxiosError = (error: unknown): never => {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as ApiResponse<never>;
    if (!data.success) throw new Error(data.message);
  }
  throw error;
};

export const getImageUrl = (photoUrl: string | null): string | null => {
  if (!photoUrl) return null;
  return `${BASE_URL}/${photoUrl}`;
};
