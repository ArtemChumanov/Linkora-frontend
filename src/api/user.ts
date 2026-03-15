import API, { RefreshAPI } from "@/lib/axiosConfig";
import { AnalyticSchema, IAnalytic } from "@/schemas/analytic.schema";
import { IRegister, IUserInfo, UserSchema } from "@/schemas/user.schemas";
import { UpdateUserInfoBody } from "@/types/user";

/***************** Register User  ************************** */

export const register = async (body: IRegister) => {
  try {
    const res = await API.post("/user", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

/***************** Login User  ************************** */
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

/***************** Refresh token ************************** */

export const refreshToken = async () => {
  try {
    const res = await RefreshAPI.get("/token/refresh-tokens");
    return res.data;
  } catch (error) {
    throw error;
  }
};

/***************** Get All info By User ************************** */

export const getUserInfo = async (userId: string): Promise<IUserInfo> => {
  const res = await API.get("/user/find-by-id/" + userId);

  const parsed = UserSchema.safeParse(res.data);

  if (!parsed.success) {
    console.error("Invalid API response", parsed.error);
    throw new Error("Invalid user data from server");
  }

  return parsed.data;
};

/***************** Update Info For User************************** */

type IUpdateUserProps = {
  body: UpdateUserInfoBody;
  userId: string;
};

export const updateUserInfo = async ({ body, userId }: IUpdateUserProps) => {
  try {
    const res = await API.patch("/user/" + userId, body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

/***************** Statisctic for own links ************************** */

export const getStatistic = async (linkCode: string): Promise<IAnalytic> => {
  const res = await API.get("/analytics/" + linkCode);

  const parsed = AnalyticSchema.safeParse(res.data);

  if (!parsed.success) {
    console.error("Invalid API response", parsed.error);
    throw new Error("Invalid projects data from server");
  }

  return parsed.data;
};
