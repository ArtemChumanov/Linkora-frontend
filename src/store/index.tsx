import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IUserSlice, userSlice } from "./slices/user.slice";

type StoreType = IUserSlice;

export const useBoundStore = create<StoreType>()(
  devtools(
    persist(
      immer((...a) => ({
        ...userSlice(...a),
      })),
      {
        name: "blog-state",
        partialize: (state) => ({
          isAuth: state.isAuth,
          userId: state.userId,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (error) console.error("Ошибка rehydrate:", error);
        },
      },
    ),
    { name: "blog1", enabled: true },
  ),
);
