import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string().min(6, "Мінімум 6 символів"),
});

export type LinkForm = z.infer<typeof CreateProjectSchema>;

export const ProjectItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  totalClicks: z.number(),
});
export const ProjectsSchema = z.array(ProjectItemSchema);

export type IProjectList = z.infer<typeof ProjectsSchema>;
export type IProjectItem = z.infer<typeof ProjectItemSchema>;
