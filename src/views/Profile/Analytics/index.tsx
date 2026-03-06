"use client";
import Browsers from "./Browsers";
import ClicksData from "./ClicksData";
import Countries from "../ProjectInfo/Countries";
import Devices from "./Devices";
import { useQuery } from "@tanstack/react-query";
import { getUserLinks } from "@/api/links";
import { useState } from "react";
import { getStatistic } from "@/api/user";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header"), {
  ssr: false,
});

const Analytics = () => {
  const [selectedCode, setSelectedCode] = useState<string>("");
  const { data: links } = useQuery({
    queryKey: ["all-links"],
    queryFn: getUserLinks,
  });

  const { data: analyticData } = useQuery({
    queryKey: ["statistic", selectedCode],
    queryFn: () => getStatistic(selectedCode as string),
    enabled: !!selectedCode,
  });
  return (
    <>
      <Header
        links={links}
        selectedCode={selectedCode}
        setSelectedCode={setSelectedCode}
      />
      <div className="grid mt-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <Devices devices={analyticData?.devices} />
          </div>

          <div className="xl:col-span-2">
            <Countries countries={analyticData?.countries} />
          </div>

          <div className="xl:col-span-2">
            <ClicksData clickDataPerDay={analyticData?.clickDataPerDay} />
          </div>

          <div className="xl:col-span-1">
            <Browsers browsers={analyticData?.browsers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
