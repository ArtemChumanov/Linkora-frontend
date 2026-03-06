"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import AuthPopup from "../popups/AuthPopup";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/hooks/useAuth";
import { useBoundStore } from "@/store";
import UserInfo from "./UserInfo";
const Header = () => {
  const [openAuth] = useModal(<AuthPopup />);
  const { isAuth } = useAuth();

  return (
    <header className="flex items-center justify-between w-full border-b py-5 px-10">
      <h2>
        <Link href="/">Flow.ly</Link>
      </h2>
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-5">
          {isAuth && <Link href="/profile/projects">Dashboard</Link>}
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
        </div>
        {isAuth ? (
          <UserInfo />
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="secondary">Log In</Button>
            <Button variant="secondary" onClick={openAuth}>
              Sign In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
