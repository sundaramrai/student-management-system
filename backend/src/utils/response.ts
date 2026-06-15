import { Response } from "express";
import { ApiSuccessResponse, ApiErrorResponse } from "../types/index.js";

export const sendSuccess = <T>(res: Response, data: T, status = 200): void => {
  const response: ApiSuccessResponse<T> = { success: true, data };
  res.status(status).json(response);
};

export const sendError = (res: Response, message: string, status = 500): void => {
  const response: ApiErrorResponse = { success: false, message };
  res.status(status).json(response);
};
