import { Request, Response, NextFunction } from "express";
import {
  loginSchema,
  refreshSchema,
  registerSchema,
} from "../modules/auth.validation";
import { login, refresh, register } from "../services/auth.service";
import { createdResponse } from "../utils/response";
import { AuthRequest } from "../middleware/auth.middleware";

export function logged(req: AuthRequest, res: Response) {
  return res.json({
    success: true,
    data: req.user,
  });
}

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = registerSchema.parse(req.body);

    const user = await register(data);

    return createdResponse(res, user, "User registered");
  } catch (error) {
    next(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await login(data.email, data.password);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);

    const tokens = await refresh(refreshToken);

    return res.json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    next(error);
  }
}
