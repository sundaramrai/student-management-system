import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateBody =
  (schema: ZodType<any>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);
    next();
  };

export const validateQuery =
  (schema: ZodType<any>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    schema.parse(req.query);
    next();
  };
