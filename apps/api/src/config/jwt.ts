import type { SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET missing");
}

if (!refreshSecret) {
  throw new Error("JWT_REFRESH_SECRET missing");
}

export const jwtConfig: {
  accessSecret: string;
  refreshSecret: string;
  accessExpiresIn: SignOptions["expiresIn"];
  refreshExpiresIn: SignOptions["expiresIn"];
} = {
  accessSecret: secret,

  refreshSecret,

  accessExpiresIn: "15m",

  refreshExpiresIn: "30d",
};
