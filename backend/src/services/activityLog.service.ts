import { activityLogRepository } from "../repositories/activityLog.repository.js";
import { PaginationQuery, PaginatedResult } from "../types/index.js";

interface ActivityLogRecord {
  id: string;
  studentId: string;
  action: string;
  createdAt: Date;
  student: {
    name: string;
    admissionNumber: string;
  };
}

export const activityLogService = {
  async log(studentId: string, action: string): Promise<void> {
    await activityLogRepository.create(studentId, action);
  },

  async getAll(
    pagination: PaginationQuery
  ): Promise<PaginatedResult<ActivityLogRecord>> {
    return activityLogRepository.findMany(pagination);
  },
};
