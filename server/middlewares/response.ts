import { NextFunction, Request, Response } from "express";

export function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  res.success = function <T>(message: string, body: T, status: number = 200) {
    return res.status(status).json({
      success: true,
      message,
      body,
      status,
    });
  };

  res.fail = function <T>(message: string, body?: T, status: number = 400) {
    return res.status(status).json({
      success: false,
      message,
      body: body || null,
      status,
    });
  };

  next();
}
