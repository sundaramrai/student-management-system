import { apiClient, extractData, handleAxiosError } from "./api";
import { ActivityLog, PaginatedResult, ApiResponse } from "@/types";

export const activityLogService = {
  async getAll(page = 1, pageSize = 20): Promise<PaginatedResult<ActivityLog>> {
    try {
      const { data } = await apiClient.get<
        ApiResponse<PaginatedResult<ActivityLog>>
      >("/activity-logs", { params: { page, pageSize } });
      return extractData(data);
    } catch (err) {
      return handleAxiosError(err);
    }
  },
};
