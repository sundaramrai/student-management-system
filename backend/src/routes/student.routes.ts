import { Router } from "express";
import { studentController } from "../controllers/student.controller.js";
import { validateBody, validateQuery } from "../middleware/validate.js";
import { uploadMiddleware } from "../middleware/upload.js";
import {
  createStudentSchema,
  updateStudentSchema,
  studentQuerySchema,
} from "../validators/student.validator.js";

const router = Router();

router.get(
  "/",
  validateQuery(studentQuerySchema),
  studentController.getAll
);

router.get("/courses", studentController.getCourses);

router.get("/:id", studentController.getById);

router.post(
  "/",
  uploadMiddleware.single("photo"),
  validateBody(createStudentSchema),
  studentController.create
);

router.put(
  "/:id",
  uploadMiddleware.single("photo"),
  validateBody(updateStudentSchema),
  studentController.update
);

router.delete("/:id", studentController.remove);

export default router;
