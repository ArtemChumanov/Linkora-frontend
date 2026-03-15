import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import type { ILoginForm } from "@/schemas/user.schemas";
import { LoginSchema } from "@/schemas/user.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

interface Props {
  onClose?: () => void;
}

const LoginForm: FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: zodResolver(LoginSchema),
  });
  const { onLogin } = useAuth();

  const onSubmit = async (data: ILoginForm) => {
    onLogin(data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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

      <Button disabled={isSubmitting} variant="default" className="btn  w-full">
        {isSubmitting ? "Loading..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
