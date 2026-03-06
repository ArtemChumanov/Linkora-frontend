import { produce } from "immer";
import { StateCreator } from "zustand";

interface IUserState {
  isAuth: boolean;
  userId: string | null;
  username: string | null;
}
interface IUserActions {
  setAuth: (isAuth: boolean) => void;
  setUserInfo: (userData: any) => void;
}
export type IUserSlice = IUserState & IUserActions;

const initialState: IUserState = {
  isAuth: false,
  userId: null,
  username: null,
};

export const userSlice: StateCreator<IUserSlice, [], [], IUserSlice> = (
  set,
) => ({
  ...initialState,
  setAuth: (isAuth) =>
    set(
      produce((state) => {
        state.isAuth = isAuth;
      }),
    ),
  setUserInfo: (userData) =>
    set(
      produce((state) => {
        state.userId = userData.id;
        state.username = userData.username;
      }),
    ),
});
