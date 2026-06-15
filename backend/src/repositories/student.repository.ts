import { prisma } from "../config/prisma.js";
import { CreateStudentData, UpdateStudentData, PaginationQuery, StudentFilters, PaginatedResult, Gender } from "../types/index.js";

interface StudentRecord {
  id: string;
  admissionNumber: string;
  name: string;
  course: string;
  year: number;
  dateOfBirth: Date;
  email: string;
  mobileNumber: string;
  gender: Gender;
  address: string;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface WhereClause {
  OR?: Array<{
    name?: { contains: string; mode: "insensitive" };
    admissionNumber?: { contains: string; mode: "insensitive" };
    email?: { contains: string; mode: "insensitive" };
    course?: { contains: string; mode: "insensitive" };
  }>;
  course?: { equals: string; mode: "insensitive" };
  gender?: Gender;
  year?: number;
}

const buildWhereClause = (filters: StudentFilters): WhereClause => {
  const where: WhereClause = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { admissionNumber: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
      { course: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.course) {
    where.course = { equals: filters.course, mode: "insensitive" };
  }

  if (filters.gender) {
    where.gender = filters.gender;
  }

  if (filters.year) {
    where.year = filters.year;
  }

  return where;
};

export const studentRepository = {
  async findMany(
    pagination: PaginationQuery,
    filters: StudentFilters
  ): Promise<PaginatedResult<StudentRecord>> {
    const where = buildWhereClause(filters);
    const page = Number(pagination.page);
    const pageSize = Number(pagination.pageSize);
    const skip = (page - 1) * pageSize;

    const [data, totalRecords] = await prisma.$transaction([
      prisma.student.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.student.count({ where }),
    ]);

    return {
      data,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalRecords,
      totalPages: Math.ceil(totalRecords / pagination.pageSize),
    };
  },

  async findById(id: string): Promise<StudentRecord | null> {
    return prisma.student.findUnique({ where: { id } }) as Promise<StudentRecord | null>;
  },

  async findByEmail(email: string): Promise<StudentRecord | null> {
    return prisma.student.findUnique({ where: { email } }) as Promise<StudentRecord | null>;
  },

  async getLastAdmissionNumber(): Promise<string | null> {
    const student = await prisma.student.findFirst({
      orderBy: { admissionNumber: "desc" },
      select: { admissionNumber: true },
    });
    return student?.admissionNumber ?? null;
  },

  async create(
    data: CreateStudentData & { admissionNumber: string }
  ): Promise<StudentRecord> {
    return prisma.student.create({ data }) as Promise<StudentRecord>;
  },

  async update(id: string, data: UpdateStudentData): Promise<StudentRecord> {
    return prisma.student.update({ where: { id }, data }) as Promise<StudentRecord>;
  },

  async delete(id: string): Promise<StudentRecord> {
    return prisma.student.delete({ where: { id } }) as Promise<StudentRecord>;
  },

  async getDistinctCourses(): Promise<string[]> {
    const results = await prisma.student.findMany({
      select: { course: true },
      distinct: ["course"],
      orderBy: { course: "asc" },
    });
    return results.map((r: { course: string }) => r.course);
  },
};
