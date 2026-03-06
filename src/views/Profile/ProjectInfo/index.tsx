"use client";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import React, { useMemo } from "react";
import TableDemo, { eventCounter } from "./Table";
import { getProjectById } from "@/api/projects";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLink, getLinksByProjects } from "@/api/links";
import { useModal } from "@/hooks/useModal";
import CreateLinkPopup from "@/components/popups/CreateLinkPopup";
import { BreadcrumbsBlock } from "@/components/common/BreadcrumbBlock";

const getLinChain = (lastPage: string) => [
  {
    name: "Projects",
    link: "/profile/projects",
  },
  { name: lastPage, link: null },
];

const calcTolatEvents = (links) =>
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

  const totalClicks = useMemo(() => calcTolatEvents(links, "Click"), [links]);

  console.log(links);
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

      <div className="flex w-full  mt-8 gap-30">
        <div className="w-full">
          <SearchInput />

          <TableDemo links={links} projectId={projectId} />
        </div>
        {/* <div className="w-1/2 border">link</div> */}
      </div>
    </div>
  );
};

export default ProjectInfo;
