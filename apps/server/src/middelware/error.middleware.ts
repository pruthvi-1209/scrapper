import { type NextFunction, type Request, type Response } from "express";

interface HttpError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = error.statusCode ?? 500;
  const message = statusCode === 500 ? "Internal Server Error" : error.message;

  res.status(statusCode).json({
    error: message,
  });
};
