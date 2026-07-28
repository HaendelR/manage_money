export function sanitizeUser<T extends { passwordHash?: string | null }>(
  user: T,
) {
  const { passwordHash, ...safeUser } = user;

  return safeUser;
}
