import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", {
    length: 255,
  }).notNull(),

  email: varchar("email", {
    length: 255,
  })
    .unique()
    .notNull(),

  passwordHash: varchar("password_hash", {
    length: 255,
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),

  deletedAt: timestamp("deleted_at"),
});

export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  token: varchar("token", {
    length: 500,
  })
    .notNull()
    .unique(),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
