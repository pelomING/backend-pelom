import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import HttpException from "../common/http-exception";
import { HttpStatus } from "../interfaces/httpStatus";
import { AuthError } from "../common/auth-error";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { statusCode, message, status, errors } = error;

  if (error instanceof ValidateError) {
    return res.status(422).json({
      message: "Validation Failed",
      details: error?.fields,
    });
  }
  if (error instanceof AuthError) {
    console.log("(1) AuthError --> ", error.message);
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: error.message
    })
  }
  console.log("(2) error --> ", statusCode, message, status, error);


  res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
    status,
    statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    message:
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? "Internal Server Error"
        : message,
    validationErrors: errors,
  });
  next();
};
