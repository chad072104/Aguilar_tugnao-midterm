import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

type FeedData = {
  name: string;
  sales: number;
};

const data: FeedData[] = [
  { name: "Starter Feed", sales: 400 },
  { name: "Grower Feed", sales: 600 },
  { name: "Finisher Feed", sales: 800 },
  { name: "Layer Feed", sales: 300 }
];

const FeedBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#0edd0e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FeedBarChart;