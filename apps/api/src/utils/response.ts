import { Response } from "express";

export function successResponse<T>(
  res: Response,
  data: T,
  message = "Success",
  status = 200
) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

export function createdResponse<T>(
  res: Response,
  data: T,
  message = "Created"
) {
  return successResponse(res, data, message, 201);
}

export function errorResponse(
  res: Response,
  message: string,
  status = 400
) {
  return res.status(status).json({
    success: false,
    message,
  });
}