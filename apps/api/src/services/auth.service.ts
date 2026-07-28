import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByEmail, getUserById } from "./users.services";
import { jwtConfig } from "../config/jwt";

import { db, eq, refreshTokens, users } from "@manage-money/database";

import type { RegisterInput } from "../modules/auth.validation";
import { sanitizeUser } from "../utils/sanitize-user";

function generateTokens(userId: string, email: string) {
  const accessToken = jwt.sign(
    {
      userId,
      email,
    },
    jwtConfig.accessSecret,
    {
      expiresIn: jwtConfig.accessExpiresIn,
    },
  );

  const refreshToken = jwt.sign(
    {
      userId,
    },
    jwtConfig.refreshSecret,
    {
      expiresIn: jwtConfig.refreshExpiresIn,
    },
  );

  return {
    accessToken,
    refreshToken,
  };
}

async function saveRefreshToken(
  userId: string,
  token: string,
  expiresAt: Date,
) {
  const result = await db
    .insert(refreshTokens)
    .values({
      userId,
      token,
      expiresAt,
    })
    .returning();

  return result[0];
}

async function getRefreshToken(token: string) {
  const result = await db
    .select()
    .from(refreshTokens)
    .where(eq(refreshTokens.token, token));

  return result[0];
}

async function deleteRefreshToken(token: string) {
  await db.delete(refreshTokens).where(eq(refreshTokens.token, token));
}

export async function refresh(refreshToken: string) {
  const storedToken = await getRefreshToken(refreshToken);

  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  if (storedToken.expiresAt < new Date()) {
    await deleteRefreshToken(refreshToken);

    throw new Error("Refresh token expired");
  }

  const payload = jwt.verify(refreshToken, jwtConfig.refreshSecret) as {
    userId: string;
  };

  const user = await getUserById(payload.userId);

  if (!user) {
    throw new Error("User not found");
  }

  await deleteRefreshToken(refreshToken);

  const tokens = generateTokens(user.id, user.email);

  await saveRefreshToken(
    user.id,
    tokens.refreshToken,
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  );

  return tokens;
}

export async function register(data: RegisterInput) {
  const passwordHash = await bcrypt.hash(data.password, 12);

  const result = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      passwordHash,
    })
    .returning();

  return sanitizeUser(result[0]);
}

export async function login(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);

  if (!passwordValid) {
    throw new Error("Invalid credentials");
  }

  const tokens = generateTokens(user.id, user.email);

  await saveRefreshToken(
    user.id,
    tokens.refreshToken,
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  );

  const { passwordHash, ...safeUser } = user;

  return {
    user: safeUser,
    ...tokens,
  };
}
