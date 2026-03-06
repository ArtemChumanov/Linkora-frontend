import { z } from "zod";

export const LoginSchema = z.object({
  userName: z.string().min(6, "Мінімум 6 символів"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export type LoginForm = z.infer<typeof LoginSchema>;

export const UserSchema = z.object({
  id: z.string(),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.array(z.string()),
});

export type IUserInfo = z.infer<typeof UserSchema>;
