import { z } from "zod";


export const userIdSchema = z.object({
  id: z.string().uuid(),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .optional(),

  email: z.string().email("Email invalide").optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
