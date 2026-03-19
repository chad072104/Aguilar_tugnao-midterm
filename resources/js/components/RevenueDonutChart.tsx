import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const data = [
  { name: "Starter Feed", value: 15000 },
  { name: "Grower Feed", value: 22000 },
  { name: "Finisher Feed", value: 30000 },
  { name: "Layer Feed", value: 25000 },
  { name: "Broiler Feed", value: 35000 },
  { name: "Pig Feed", value: 28000 },
  { name: "Duck Feed", value: 18000 },
  { name: "Organic Feed", value: 12000 },
];

const COLORS = [
  "#4CAF50", "#2196F3", "#FFC107",
  "#FF5722", "#9C27B0", "#00BCD4",
  "#8BC34A", "#FF9800"
];

export default function RevenueDonutChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}