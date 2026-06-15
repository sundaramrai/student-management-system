import { Request, Response, NextFunction } from "express";
import { activityLogService } from "../services/activityLog.service.js";
import { sendSuccess } from "../utils/response.js";
import { ActivityLogQueryInput } from "../validators/student.validator.js";

export const activityLogController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query as unknown as ActivityLogQueryInput;
      const result = await activityLogService.getAll({
        page: query.page,
        pageSize: query.pageSize,
      });
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  },
};
