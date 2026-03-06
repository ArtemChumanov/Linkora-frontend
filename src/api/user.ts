import API, { RefreshAPI } from "@/lib/axiosConfig";
import { AnalyticSchema, IAnalytic } from "@/schemas/analytic.schema";
import { IUserInfo, UserSchema } from "@/schemas/user.schemas";
import { UpdateUserInfoBody } from "@/types/user";

type LoginBody = {
  userName: string;
  password: string;
};

export const login = async (body: LoginBody) => {
  try {
    const res = await API.post("/auth/login", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const res = await RefreshAPI.get("/token/refresh-tokens");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (userId: string): Promise<IUserInfo> => {
  const res = await API.get("/user/find-by-id/" + userId);

  const parsed = UserSchema.safeParse(res.data);

  if (!parsed.success) {
    console.error("Invalid API response", parsed.error);
    throw new Error("Invalid user data from server");
  }

  return parsed.data;
};

export const updateUserInfo = async ({
  body,
  userId,
}: {
  body: UpdateUserInfoBody;
  userId: string;
}) => {
  try {
    const res = await API.patch("/user/" + userId, body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getStatistic = async (linkCode: string): Promise<IAnalytic> => {
  const res = await API.get("/analytics/" + linkCode);

  const parsed = AnalyticSchema.safeParse(res.data);

  if (!parsed.success) {
    console.error("Invalid API response", parsed.error);
    throw new Error("Invalid projects data from server");
  }

  return parsed.data;
};
