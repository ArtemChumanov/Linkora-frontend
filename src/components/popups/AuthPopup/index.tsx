"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoginForm, LoginSchema } from "@/schemas/user.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

interface AuthPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AuthPopup: FC<AuthPopupProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: "artemchumanov2333",
      password: "Aer453232t!",
    },
  });
  const { onLogin } = useAuth();

  const onSubmit = async (data: LoginForm) => {
    onLogin(data);
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          {/* Email */}
          <div>
            <Input
              type="userName"
              placeholder="Username"
              {...register("userName")}
            />

            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            variant="default"
            className="btn  w-full"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPopup;
