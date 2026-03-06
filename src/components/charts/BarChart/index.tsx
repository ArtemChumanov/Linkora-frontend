import React, { FC } from "react";
import {
  BarChart as BarChartBlock,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    name: string;
    value: string;
  }[];
}

const BarChart: FC<Props> = ({ data }) => {
  return (
    <BarChartBlock
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "700px",
        minHeight: "500px",
        aspectRatio: 1.6,
      }}
      responsive
      data={data}
      // margin={{
      //   top: 25,
      //   right: 0,
      //   left: 0,
      //   bottom: 5,
      // }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" dataKey="value" />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" barSize={30} />
    </BarChartBlock>
  );
};

export default BarChart;
