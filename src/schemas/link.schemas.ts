import { z } from "zod";

export const LinkSchema = z.object({
  url: z
    .string()
    .url("Введи коректне посилання (https://...)")
    .min(6, "Мінімум 6 символів"),
});

export type LinkForm = z.infer<typeof LinkSchema>;

export const UserLinkSchema = z.object({
  code: z.string(),
});

export const UserLinksSchema = z.array(UserLinkSchema);

export type IUserLink = z.infer<typeof UserLinkSchema>;
