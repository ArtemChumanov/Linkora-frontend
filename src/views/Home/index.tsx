"use client";
import { useQuery } from "@tanstack/react-query";
import Benefits from "./Benefits";
import Hero from "./Hero";
import Statistic from "./Statistic";
import { getLinks } from "@/api/links";
import { getProjects } from "@/api/projects";
import { useBoundStore } from "@/store";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const Home = () => {
  const { data } = useQuery({ queryKey: ["todos"], queryFn: getProjects });
  // const updateFirstName = useBoundStore((state) => state.updateFirstName);
  // const firstName = useBoundStore((state) => state.firstName);

  return (
    <div className="max-w-[1980px] mx-auto px-20">
      <Hero />
      <Benefits />
      <Statistic />
    </div>
  );
};

export default Home;
