import { FC } from "react";
import { Input } from "@/components/ui/input";
import type { IRegister } from "@/schemas/user.schemas";
import { RegisterSchema } from "@/schemas/user.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

interface Props {
  onClose?: () => void;
}

const RegisterForm: FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegister>({
    resolver: zodResolver(RegisterSchema),
  });
  const { onRegister } = useAuth();

  const onSubmit = async (data: IRegister) => {
    onRegister(data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div>
        <Input
          type="firstName"
          placeholder="first name"
          {...register("firstName")}
        />

        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <Input
          type="lastName"
          placeholder="Last name"
          {...register("lastName")}
        />

        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>

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
        <Input type="email" placeholder="Email" {...register("email")} />

        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input type="phone" placeholder="Phone" {...register("phone")} />

        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
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

export default RegisterForm;
