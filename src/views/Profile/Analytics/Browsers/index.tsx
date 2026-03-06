import PieChart from "@/components/charts/PieChart";
import CardWrapper from "../common/CardWrapper";
// import { RechartsDevtools } from "@recharts/devtools";

const Browsers = ({ browsers }) => {
  return (
    <CardWrapper title="Browsers">
      <PieChart data={browsers} />
    </CardWrapper>
  );
};

export default Browsers;
