import { studentRepository } from "../repositories/student.repository.js";
import { activityLogService } from "./activityLog.service.js";
import {
  CreateStudentData,
  UpdateStudentData,
  PaginationQuery,
  StudentFilters,
  PaginatedResult,
  Gender,
} from "../types/index.js";
import { NotFoundError, ConflictError } from "../errors/AppError.js";
import {
  generateAdmissionNumber,
  parseSequenceFromAdmissionNumber,
} from "../utils/admissionNumber.js";
import { ACTIVITY_ACTIONS } from "../constants/index.js";

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

const generateNextAdmissionNumber = async (): Promise<string> => {
  const last = await studentRepository.getLastAdmissionNumber();
  if (!last) return generateAdmissionNumber(1);
  const lastSeq = parseSequenceFromAdmissionNumber(last);
  return generateAdmissionNumber(lastSeq + 1);
};

export const studentService = {
  async getAll(
    pagination: PaginationQuery,
    filters: StudentFilters
  ): Promise<PaginatedResult<StudentRecord>> {
    return studentRepository.findMany(pagination, filters);
  },

  async getById(id: string): Promise<StudentRecord> {
    const student = await studentRepository.findById(id);
    if (!student) throw new NotFoundError("Student");
    return student;
  },

  async create(data: CreateStudentData): Promise<StudentRecord> {
    const existing = await studentRepository.findByEmail(data.email);
    if (existing) throw new ConflictError("Email already registered");

    const admissionNumber = await generateNextAdmissionNumber();
    const student = await studentRepository.create({ ...data, admissionNumber });

    await activityLogService.log(student.id, ACTIVITY_ACTIONS.CREATED);
    return student;
  },

  async update(id: string, data: UpdateStudentData): Promise<StudentRecord> {
    const existing = await studentRepository.findById(id);
    if (!existing) throw new NotFoundError("Student");

    if (data.email && data.email !== existing.email) {
      const emailTaken = await studentRepository.findByEmail(data.email);
      if (emailTaken) throw new ConflictError("Email already registered");
    }

    const student = await studentRepository.update(id, data);
    await activityLogService.log(student.id, ACTIVITY_ACTIONS.UPDATED);
    return student;
  },

  async delete(id: string): Promise<void> {
    const existing = await studentRepository.findById(id);
    if (!existing) throw new NotFoundError("Student");

    await activityLogService.log(id, ACTIVITY_ACTIONS.DELETED);
    await studentRepository.delete(id);
  },

  async getDistinctCourses(): Promise<string[]> {
    return studentRepository.getDistinctCourses();
  },
};
