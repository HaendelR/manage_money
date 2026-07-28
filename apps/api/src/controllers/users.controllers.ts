import { NextFunction, Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  restoreUser,
  updateUser,
} from "../services/users.services";
import { updateUserSchema, userIdSchema } from "../modules/users.validation";
import { successResponse } from "../utils/response";

export async function AllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await getAllUsers();

    return successResponse(res, users);
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = userIdSchema.parse(req.params);

    const user = await getUserById(id);

    return successResponse(res, user);
  } catch (error) {
    next(error);
  }
}

export async function editUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = userIdSchema.parse(req.params);

    const data = updateUserSchema.parse(req.body);

    const user = await updateUser(id, data);

    return successResponse(res, user);
  } catch (error) {
    next(error);
  }
}

export async function removeUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = userIdSchema.parse(req.params);

    const user = await deleteUser(id);

    return successResponse(res, user);
  } catch (error) {
    next(error);
  }
}

export async function recoveryUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = userIdSchema.parse(req.params);

    const user = await restoreUser(id);

    return successResponse(res, user);
  } catch (error) {
    next(error);
  }
}
