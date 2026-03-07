import { createProject } from "@/api/projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CreateProjectSchema } from "@/schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";

type CreateProjectForm = {
  name: string;
};

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const CreateProjectPopup: FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(CreateProjectSchema),
  });

  const queryClient = useQueryClient();
  const { mutate: createNewLink } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
        exact: true,
      });
      onClose?.();
    },
  });

  const onSubmit = (data: CreateProjectForm) => {
    createNewLink(data);
    onClose?.();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Link</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          {/* Email */}
          <div>
            <Input
              type="name"
              placeholder="Enter project name"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            variant="default"
            className="btn  w-full"
          >
            {isSubmitting ? "Loading..." : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectPopup;
