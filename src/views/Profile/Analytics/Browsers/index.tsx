import PieChart from "@/components/charts/PieChart";
import CardWrapper from "../common/CardWrapper";
import { FC } from "react";
// import { RechartsDevtools } from "@recharts/devtools";

interface Props {
  browsers: {
    name: string;
    value: number;
  }[];
}
const Browsers: FC<Props> = ({ browsers }) => {
  return (
    <CardWrapper title="Browsers">
      <PieChart data={browsers} />
    </CardWrapper>
  );
};

export default Browsers;
