import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type RevenueData = {
  name: string;
  value: number;
};

const data: RevenueData[] = [
  { name: "Starter Feed", value: 40000 },
  { name: "Grower Feed", value: 35000 },
  { name: "Finisher Feed", value: 25000 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RevenueDonutChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius={60} outerRadius={100}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RevenueDonutChart;