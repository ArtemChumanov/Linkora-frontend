"use client";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/projects";
import { useModal } from "@/hooks/useModal";
import CreateProjectPopup from "@/components/popups/CreateProjectPopup";
import { Plus } from "lucide-react";

const Projects = () => {
  const [present] = useModal(<CreateProjectPopup />);

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  console.log("12345", projects);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button variant="default" onClick={present}>
          Create new project
        </Button>
      </div>
      <div className="grid  gap-5 mt-8 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {projects?.map((projectData) => (
          <ProjectCard key={projectData.id} projectData={projectData} />
        ))}
        <button
          className="border rounded-xl shadow-md p-10 relative min-h-[220px]"
          onClick={present}
        >
          <Plus
            width={50}
            height={50}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </button>
      </div>
    </div>
  );
};

export default Projects;
