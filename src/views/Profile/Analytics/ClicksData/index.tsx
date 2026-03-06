import BarChart from "@/components/charts/BarChart";
import CardWrapper from "../common/CardWrapper";
// #region Sample data

const ClicksData = ({ clickDataPerDay }) => {
  return (
    <CardWrapper title="Clicks per Day">
      <BarChart data={clickDataPerDay} />
    </CardWrapper>
  );
};

export default ClicksData;
