"use client";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import TableDemo from "./Table";
import { getProjectById } from "@/api/projects";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLinksByProjects } from "@/api/links";
import { useModal } from "@/hooks/useModal";
import CreateLinkPopup from "@/components/popups/CreateLinkPopup";
import BreadcrumbsBlock from "@/components/common/BreadcrumbBlock";
import { ILink } from "@/types/user";

const getLinChain = (lastPage: string) => [
  {
    name: "Projects",
    link: "/profile/projects",
  },
  { name: lastPage, link: null },
];

const calcTolatEvents = (links: ILink[]) =>
  links?.reduce((acc, link) => acc + link.events.length, 0);

const ProjectInfo = () => {
  const { projectId } = useParams();
  const { data: projectsInfo } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId as string),
    enabled: !!projectId,
  });

  const { data: links } = useQuery({
    queryKey: ["links", projectId],
    queryFn: () => getLinksByProjects(projectId as string),
    enabled: !!projectId,
  });

  const totalClicks = useMemo(() => calcTolatEvents(links), [links]);

  const [present] = useModal(
    <CreateLinkPopup projectId={projectId as string} />,
  );

  const { name } = projectsInfo || {};

  return (
    <div>
      <div className="flex justify-between">
        <BreadcrumbsBlock linkChain={getLinChain(name)} />
        <Button variant="default" onClick={present}>
          Create new link
        </Button>
      </div>
      <h1 className="text-3xl mt-4 uppercase">{name}</h1>

      <div className="flex w-full border rounded-xl shadow-md mt-8">
        <div className="flex-col px-20 py-6">
          <h4 className="text-2xl font-bold ">{links?.length ?? 0}</h4>
          <p className="text-lg ">Links</p>
        </div>

        <div className="flex-col px-20 py-6">
          <h4 className="text-2xl font-bold ">{totalClicks}</h4>
          <p className="text-lg ">Clicks</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold  mt-8">My links</h2>

      <div className="flex w-full">
        <div className="w-full">
          <TableDemo links={links} projectId={projectId as string} />
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
