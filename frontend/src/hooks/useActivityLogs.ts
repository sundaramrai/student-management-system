import { useQuery } from "@tanstack/react-query";
import { activityLogService } from "@/services/activityLog.service";

export const ACTIVITY_LOG_KEYS = {
  all: ["activity-logs"] as const,
  list: (page: number, pageSize: number) =>
    [...ACTIVITY_LOG_KEYS.all, page, pageSize] as const,
};

export const useActivityLogs = (page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: ACTIVITY_LOG_KEYS.list(page, pageSize),
    queryFn: () => activityLogService.getAll(page, pageSize),
  });
};
