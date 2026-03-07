"use client";
import { getUserInfo, updateUserInfo } from "@/api/user";
import InputField from "@/components/common/InputField";
import { Button } from "@/components/ui/button";
import { useBoundStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export interface IUserSettingsForm {
  userName: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const Settings = () => {
  const { userId } = useBoundStore((store) => store);
  const queryClient = useQueryClient();

  const { control, reset, handleSubmit } = useForm<IUserSettingsForm>({
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const { data: userInfo } = useQuery({
    queryKey: ["settings", userId],
    queryFn: () => getUserInfo(userId as string),
    enabled: !!userId,
  });

  const { mutate: onUpdateUser } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", userId],
        exact: true,
      });
    },
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        userName: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
      });
    }
  }, [userInfo, reset]);

  const onUpdate = (data: IUserSettingsForm) => {
    onUpdateUser({ body: data, userId: userId as string });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
      <form className="mt-6" onSubmit={handleSubmit(onUpdate)}>
        <Controller
          name="userName"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <InputField
                label="userName"
                placeholder="Enter name"
                value={field.value}
                onChange={field.onChange}
                errorText={fieldState.error?.message}
              />
            );
          }}
        />
        <Controller
          name="firstName"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <InputField
                label="firstName"
                placeholder="Enter name"
                value={field.value}
                onChange={field.onChange}
                errorText={fieldState.error?.message}
              />
            );
          }}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <InputField
                label="lastName"
                placeholder="Enter name"
                value={field.value}
                onChange={field.onChange}
                errorText={fieldState.error?.message}
              />
            );
          }}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <InputField
                label="phone"
                placeholder="Enter name"
                value={field.value}
                onChange={field.onChange}
                errorText={fieldState.error?.message}
              />
            );
          }}
        />
        <Button variant="default" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default Settings;
