import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AppError } from "../errors/AppError.js";
import { sendError } from "../utils/response.js";

interface PrismaKnownError {
  code: string;
  meta?: Record<string, unknown>;
}

const isPrismaKnownError = (err: unknown): err is PrismaKnownError =>
  typeof err === "object" &&
  err !== null &&
  "code" in err &&
  typeof (err as Record<string, unknown>)["code"] === "string";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof z.ZodError) {
    const message = err.issues.map((e) => e.message).join(", ");
    sendError(res, message, 400);
    return;
  }

  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode);
    return;
  }

  if (isPrismaKnownError(err)) {
    if (err.code === "P2002") {
      const target = Array.isArray(err.meta?.["target"])
        ? (err.meta["target"] as string[]).join(", ")
        : "field";
      sendError(res, `Duplicate value for ${target}`, 409);
      return;
    }
    if (err.code === "P2025") {
      sendError(res, "Record not found", 404);
      return;
    }
  }

  if (err instanceof Error) {
    console.error("Unhandled error:", err.message);
  }
  sendError(res, "Internal server error", 500);
};
