import PieChart from "@/components/charts/PieChart";
import CardWrapper from "../common/CardWrapper";
// import { RechartsDevtools } from "@recharts/devtools";

const Devices = ({ devices }) => {
  console.log(devices);
  return (
    <CardWrapper title="Devices">
      <PieChart data={devices} />
    </CardWrapper>
  );
};

export default Devices;
