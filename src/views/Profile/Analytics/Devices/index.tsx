import PieChart from "@/components/charts/PieChart";
import CardWrapper from "../common/CardWrapper";
import { FC } from "react";
// import { RechartsDevtools } from "@recharts/devtools";

type Props = {
  devices: {
    name: string;
    value: number;
  }[];
};
const Devices: FC<Props> = ({ devices }) => {
  return (
    <CardWrapper title="Devices">
      <PieChart data={devices} />
    </CardWrapper>
  );
};

export default Devices;
