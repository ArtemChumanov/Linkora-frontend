import BarChart from "@/components/charts/BarChart";
import CardWrapper from "../common/CardWrapper";
import { FC } from "react";
// #region Sample data
interface IClicksData {
  clickDataPerDay: {
    name: string;
    value: number;
  }[];
}
const ClicksData: FC<IClicksData> = ({ clickDataPerDay }) => {
  return (
    <CardWrapper title="Clicks per Day">
      <BarChart data={clickDataPerDay} />
    </CardWrapper>
  );
};

export default ClicksData;
