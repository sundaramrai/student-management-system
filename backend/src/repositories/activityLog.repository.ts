import { prisma } from "../config/prisma.js";
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

export const activityLogRepository = {
  async create(studentId: string, action: string): Promise<void> {
    await prisma.activityLog.create({ data: { studentId, action } });
  },

  async findMany(
    pagination: PaginationQuery
  ): Promise<PaginatedResult<ActivityLogRecord>> {
    const page = Number(pagination.page);
    const pageSize = Number(pagination.pageSize);
    const skip = (page - 1) * pageSize;

    const [data, totalRecords] = await prisma.$transaction([
      prisma.activityLog.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          student: { select: { name: true, admissionNumber: true } },
        },
      }),
      prisma.activityLog.count(),
    ]);

    return {
      data,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalRecords,
      totalPages: Math.ceil(totalRecords / pagination.pageSize),
    };
  },
};
