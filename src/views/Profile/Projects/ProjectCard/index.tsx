"use client";
import { Button } from "@/components/ui/button";
import { IProjectItem } from "@/schemas/project.schema";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  projectData: IProjectItem;
}

const ProjectCard: FC<Props> = ({ projectData }) => {
  const { name, id, totalClicks } = projectData || {};
  const { push } = useRouter();

  const handleViewLinks = () => {
    push("/profile/projects/" + id);
  };

  return (
    <div className="border rounded-xl shadow-md p-10">
      <h3 className="text-3xl font-bold">{name}</h3>

      <div className="flex justify-between">
        <div className="flex-col">
          <h4 className="text-xl font-bold ">{totalClicks}</h4>
          <p className="text-lg ">Clicks</p>
        </div>
      </div>
      <Button className="mt-4" variant="default" onClick={handleViewLinks}>
        View links
      </Button>
    </div>
  );
};

export default ProjectCard;
