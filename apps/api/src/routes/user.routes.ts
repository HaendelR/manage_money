import { Router } from "express";
import {
  AllUsers,
  editUser,
  getUser,
  recoveryUser,
  removeUser,
} from "../controllers/users.controllers";

const router = Router();

router.get("/", AllUsers);

router.put("/:id", editUser);

router.get("/:id", getUser);

router.delete("/:id", removeUser);

router.patch("/:id/restore", recoveryUser);

export default router;
