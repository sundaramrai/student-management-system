import { Router } from "express";
import studentRoutes from "./student.routes.js";
import activityLogRoutes from "./activityLog.routes.js";

const router = Router();

router.use("/students", studentRoutes);
router.use("/activity-logs", activityLogRoutes);

export default router;
