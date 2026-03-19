import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend
} from "recharts";

const data = [
  { name: "Starter Feed", sales: 120 },
  { name: "Grower Feed", sales: 180 },
  { name: "Finisher Feed", sales: 250 },
  { name: "Layer Feed", sales: 200 },
  { name: "Broiler Feed", sales: 300 },
  { name: "Organic Feed", sales: 90 },
  { name: "Mash Feed", sales: 140 },
  { name: "Pellet Feed", sales: 220 },
  { name: "Crumbles", sales: 160 },
  { name: "Custom Mix A", sales: 110 },
  { name: "Custom Mix B", sales: 130 },
  { name: "Duck Feed", sales: 170 },
  { name: "Pig Feed", sales: 260 },
];

export default function FeedBarChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#4CAF50" />
      </BarChart>
    </ResponsiveContainer>
  );
}