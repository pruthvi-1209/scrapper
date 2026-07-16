import { type NextFunction, type Request, type Response } from "express";

interface HttpError extends Error {
  statusCode?: number;
}

export const notFoundMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error: HttpError = new Error("Resource not found");
  error.statusCode = 404;

  next(error);
};
