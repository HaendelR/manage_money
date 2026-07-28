import express from "express";

import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { notFoundMiddleware } from "./middleware/not-found.middleware";

import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

// End
app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
