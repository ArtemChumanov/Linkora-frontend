import BarChart from "@/components/charts/BarChart";
import CardWrapper from "../../Analytics/common/CardWrapper";
import { FC } from "react";
// #region Sample data

interface ICountry {
  countries: {
    name: string;
    value: number;
  }[];
}
const Countries: FC<ICountry> = ({ countries }) => {
  return (
    <CardWrapper title="Top countries">
      <BarChart data={countries} />
    </CardWrapper>
  );
};

export default Countries;
