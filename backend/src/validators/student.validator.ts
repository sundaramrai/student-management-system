import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  course: z.string().min(2, "Course must be at least 2 characters").max(100),
  year: z.coerce.number().int().min(1).max(6),
  dateOfBirth: z.coerce.date(),
  email: z.email("Invalid email address"),
  mobileNumber: z
    .string()
    .pipe(z.string().refine((val) => /^\+?\d{10,15}$/.test(val), "Invalid mobile number")),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  address: z.string().min(5, "Address must be at least 5 characters").max(500),
});

export const updateStudentSchema = createStudentSchema.partial();

export const studentQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  course: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  year: z.coerce.number().int().positive().optional(),
});

export const activityLogQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type StudentQueryInput = z.infer<typeof studentQuerySchema>;
export type ActivityLogQueryInput = z.infer<typeof activityLogQuerySchema>;
