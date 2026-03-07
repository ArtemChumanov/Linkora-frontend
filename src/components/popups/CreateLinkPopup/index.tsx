import { createLink } from "@/api/links";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LinkSchema } from "@/schemas/link.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface CreateLinkPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  projectId: string;
}
type CreateLinkForm = {
  url: string;
};

const CreateLinkPopup: FC<CreateLinkPopupProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkForm>({
    resolver: zodResolver(LinkSchema),
  });

  const queryClient = useQueryClient();
  const { mutate: createNewLink } = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links", projectId],
        exact: true,
      });
      onClose?.();
    },
  });

  const onSubmit = (data: CreateLinkForm) => {
    createNewLink({ ...data, projectId });
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
            <Input type="url" placeholder="Enter url" {...register("url")} />

            {errors.url && (
              <p className="text-red-500 text-sm">{errors.url.message}</p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            variant="default"
            className="btn  w-full"
          >
            {isSubmitting ? "Loading..." : "Create Link"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLinkPopup;
