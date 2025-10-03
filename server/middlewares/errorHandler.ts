import { NextFunction, Request, Response } from "express";

import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} from "@sequelize/core";
import { HttpError } from "../utils/httpError.js";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  let statusCode = 500;
  let message = "There is a problem on the server side.";

  if (err instanceof ValidationError) {
    statusCode = 400;
    if (err.cause && err.name === "SequelizeUniqueConstraintError") {
      statusCode = 409;
    }
    message = err.errors.map((e) => e.message).join(" | ");
    res.fail(message, null, statusCode);
    return;
  }

  if (err instanceof UniqueConstraintError) {
    statusCode = 409;
    message = err.errors.map((e) => e.message).join(" | ");
    res.fail(message, null, statusCode);
    return;
  }

  if (err instanceof ForeignKeyConstraintError) {
    statusCode = 400;
    message = "The reference ID is invalid or does not exist.";
    res.fail(message, null, statusCode);
    return;
  }

  if (err instanceof DatabaseError) {
    statusCode = 503;
    message = "The database service is unavailable. Please try again later.";
    res.fail(message, null, statusCode);
    return;
  }

  if (err instanceof HttpError) {
    res.fail(err.message, null, err.statusCode);
    return;
  }

  res.fail(message, null, statusCode);

  next(err);
}
