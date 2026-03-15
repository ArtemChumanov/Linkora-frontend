"use client";
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  param?: "login" | "register";
}

const AuthPopup: FC<AuthPopupProps> = ({
  isOpen,
  onClose,
  param = "login",
}) => {
  const renderForm = (type: "login" | "register") => {
    switch (type) {
      case "login":
        return <LoginForm onClose={onClose} />;
      case "register":
        return <RegisterForm onClose={onClose} />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in</DialogTitle>
        </DialogHeader>
        {renderForm(param)}
      </DialogContent>
    </Dialog>
  );
};

export default AuthPopup;
