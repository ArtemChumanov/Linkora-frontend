"use client";
import { login } from "@/api/user";
import { useBoundStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { setAuth, setUserInfo, isAuth } = useBoundStore((state) => state);
  const { push } = useRouter();

  useEffect(() => {
    // перевірка токена при першому рендері
    const token = localStorage.getItem("accessToken");
    setAuth(!!token);
  }, [setAuth]);

  const { mutate: onLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      setUserInfo(data.user);
      setAuth(true);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth(false);
    push("/");
  };

  return { onLogin, isAuth, logout };
};
