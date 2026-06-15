import { Router } from "express";
import { activityLogController } from "../controllers/activityLog.controller.js";
import { validateQuery } from "../middleware/validate.js";
import { activityLogQuerySchema } from "../validators/student.validator.js";

const router = Router();

router.get(
  "/",
  validateQuery(activityLogQuerySchema),
  activityLogController.getAll
);

export default router;
