import API from "@/lib/axiosConfig";
import {
  IUserLink,
  UserLinkSchema,
  UserLinksSchema,
} from "@/schemas/link.schemas";

export const getLinksByProjects = async (projectId: string) => {
  try {
    const res = await API.get("/link/" + projectId);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createLink = async (body: { url: string; projectId: string }) => {
  try {
    const res = await API.post("/link/", body);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const removeLink = async (projectId: string) => {
  try {
    const res = await API.delete("/link/" + projectId);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getUserLinks = async (): Promise<IUserLink[]> => {
  const res = await API.get("/link/all-user-links");

  const parsed = UserLinksSchema.safeParse(res.data);
  console.log(parsed);
  if (!parsed.success) {
    console.error("Invalid API response", parsed.error);
    throw new Error("Invalid projects data from server");
  }

  return parsed.data;
};
