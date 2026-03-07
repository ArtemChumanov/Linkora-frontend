import { createLink, getLinksByProjects } from "@/api/links";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLinks = (projectId?: string) => {
  const queryClient = useQueryClient();

  // 1. Отримання лінків
  const linksQuery = useQuery({
    queryKey: ["links", projectId],
    queryFn: () => getLinksByProjects(projectId!),
    enabled: !!projectId,
  });

  // 2. Мутація для створення нового лінку
  const createLinkMutation = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links", projectId],
      });
    },
  });

  return {
    ...linksQuery,
    createNewLink: createLinkMutation.mutate,
  };
};
