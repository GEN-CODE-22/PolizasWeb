import { z } from "zod";

export const authSchema = z.object({
  user: z.string(),
  password: z.string(),
  server: z.string().optional(),
});

export type AuthInput = z.infer<typeof authSchema>;
