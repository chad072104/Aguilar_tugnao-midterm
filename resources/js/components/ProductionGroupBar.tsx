import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

type ProductionData = {
  month: string;
  planned: number;
  actual: number;
};

const data: ProductionData[] = [
  { month: "Jan", planned: 500, actual: 480 },
  { month: "Feb", planned: 600, actual: 590 },
  { month: "Mar", planned: 700, actual: 690 }
];

const ProductionGroupBar: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="planned" fill="#13d908" />
        <Bar dataKey="actual" fill="#d70404" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductionGroupBar;