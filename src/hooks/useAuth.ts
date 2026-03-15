"use client";
import { login, register } from "@/api/user";
import { useBoundStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = () => {
  const { setAuth, setUserInfo, isAuth } = useBoundStore((state) => state);
  const { push } = useRouter();

  useEffect(() => {
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

  const { mutate: onRegister } = useMutation({
    mutationFn: register,
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

  return { onLogin, onRegister, isAuth, logout };
};
