import { Router } from "express";

import {
  logged,
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logged", authMiddleware, logged);
router.post("/refresh", refreshToken);

export default router;
