import { db, users, eq, isNull, and } from "@manage-money/database";
import type { UpdateUserInput } from "../modules/users.validation";
import { sanitizeUser } from "../utils/sanitize-user";

export async function getAllUsers() {
  const result = await db.select().from(users).where(isNull(users.deletedAt));

  return result.map(sanitizeUser);
}

export async function getUserById(id: string) {
  const result = await db
    .select()
    .from(users)
    .where(and(eq(users.id, id), isNull(users.deletedAt)));

  return result[0] ? sanitizeUser(result[0]) : null;
}

export async function updateUser(id: string, data: UpdateUserInput) {
  const result = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();

  return result[0] ? sanitizeUser(result[0]) : null;
}

export async function getUserByEmail(email: string) {
  const result = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), isNull(users.deletedAt)));

  return result[0];
}

export async function deleteUser(id: string) {
  const result = await db
    .update(users)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning();

  return result[0] ? sanitizeUser(result[0]) : null;
}

export async function restoreUser(id: string) {
  const result = await db
    .update(users)
    .set({
      deletedAt: null,
    })
    .where(eq(users.id, id))
    .returning();

  return result[0] ? sanitizeUser(result[0]) : null;
}
