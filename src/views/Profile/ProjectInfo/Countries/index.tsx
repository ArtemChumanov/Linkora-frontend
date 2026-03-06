import BarChart from "@/components/charts/BarChart";
import CardWrapper from "../../Analytics/common/CardWrapper";
// #region Sample data

const Countries = ({ countries }) => {
  return (
    <CardWrapper title="Top countries">
      <BarChart data={countries} />
    </CardWrapper>
  );
};

export default Countries;
