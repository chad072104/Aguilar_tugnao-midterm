import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

type SalesData = {
  month: string;
  sales: number;
  forecast: number;
};

const data: SalesData[] = [
  { month: "Jan", sales: 300, forecast: 320 },
  { month: "Feb", sales: 350, forecast: 360 },
  { month: "Mar", sales: 400, forecast: 420 },
  { month: "Apr", sales: 450, forecast: 470 }
];

const SalesLineChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
        <Line type="monotone" dataKey="forecast" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesLineChart;