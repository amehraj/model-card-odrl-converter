import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(err.statusCode || 500).json({
    msg: err.message || "Internal Server Error",
  });

  next(err);
};
