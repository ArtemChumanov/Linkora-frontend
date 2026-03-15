import API from "@/lib/axiosConfig";
import { IProjectList, ProjectsSchema } from "@/schemas/project.schema";

export const getProjects = async (): Promise<IProjectList> => {
  const res = await API.get("/project");
  const parsed = ProjectsSchema.safeParse(res.data);

  if (!parsed.success) {
    console.error("Invalid API response", parsed.error);
    throw new Error("Invalid projects data from server");
  }

  return parsed.data;
};

export const getProjectById = async (id: string) => {
  try {
    const res = await API.get("/project/" + id);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createProject = async (body: { name: string }) => {
  try {
    const res = await API.post("/project", body);
    return res.data;
  } catch (err) {
    throw err;
  }
};
