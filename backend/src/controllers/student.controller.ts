import { Request, Response, NextFunction } from "express";
import { studentService } from "../services/student.service.js";
import { sendSuccess } from "../utils/response.js";
import { CreateStudentInput, UpdateStudentInput, StudentQueryInput } from "../validators/student.validator.js";

const getParam = (param: string | string[] | undefined): string =>
  Array.isArray(param) ? (param[0] ?? "") : (param ?? "");

export const studentController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query as unknown as StudentQueryInput;
      const result = await studentService.getAll(
        { page: query.page, pageSize: query.pageSize },
        {
          search: query.search,
          course: query.course,
          gender: query.gender,
          year: query.year,
        }
      );
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const student = await studentService.getById(getParam(req.params["id"]));
      sendSuccess(res, student);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as CreateStudentInput;
      const photoUrl = req.file ? `uploads/${req.file.filename}` : undefined;
      const student = await studentService.create({ ...body, photoUrl });
      sendSuccess(res, student, 201);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as UpdateStudentInput;
      const photoUrl = req.file ? `uploads/${req.file.filename}` : undefined;
      const updateData = photoUrl ? { ...body, photoUrl } : body;
      const student = await studentService.update(getParam(req.params["id"]), updateData);
      sendSuccess(res, student);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await studentService.delete(getParam(req.params["id"]));
      sendSuccess(res, { message: "Student deleted successfully" });
    } catch (err) {
      next(err);
    }
  },

  async getCourses(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courses = await studentService.getDistinctCourses();
      sendSuccess(res, courses);
    } catch (err) {
      next(err);
    }
  },
};
